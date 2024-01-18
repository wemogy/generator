#!/bin/bash

solution=$1
webservice=$2
swagger=$3
targetDirectory=$4
packageName=$5

projectPath=$targetDirectory/$packageName

openApiConfigPath=$targetDirectory/.openapi-generator/csharp.yaml

# Verify that openapi-generator is installed
if ! command -v openapi-generator &> /dev/null
then
    echo "openapi-generator could not be found"
    exit
fi

# Verify that openapi-generator version is 7.*
if [[ $(openapi-generator version) != 7.* ]];
then
    echo "openapi-generator version 7.* is required - you have version $(openapi-generator version)"
    exit
fi

# Create target path
mkdir -p $targetDirectory/.openapi-generator

# Generate config file for openapi-generator
echo "Generate config file for openapi-generator"
cat > $openApiConfigPath <<EOF
additionalProperties:
  library: restsharp
  useDateTimeOffset: true
  nullableReferenceTypes: true
  packageName: $packageName
  packageVersion: 1.0.0
  targetFramework: netstandard2.1
  nonPublicApi: false # Can be set to true for rich SDKs, where the API should not be exposed to the user directly
EOF

# Generate swagger.json
echo "Generate swagger.json"
dotnet build $webservice -c Release

# C#
openapi-generator generate \
  -i $swagger \
  -o $targetDirectory \
  -g csharp \
  -c $openApiConfigPath

# Remove generated SLN
rm $targetDirectory/*.sln
rm $targetDirectory/.gitignore
rm $targetDirectory/appveyor.yml
rm $targetDirectory/git_push.sh
rm $openApiConfigPath

# Remove generated src folder nesting
rm -r $projectPath/Api
rm -r $projectPath/Client
rm -r $projectPath/Model
mv $targetDirectory/src/$packageName/* $projectPath
rm -r $targetDirectory/src

# remove generated test project
rm -r $targetDirectory/$packageName.Test

# fix warning in generated code
# if not already fixed

if ! grep -q ";MSB3245;MSB3243" $projectPath/$packageName.csproj; then
sed -i '' "s|</Project>|\n\
  <PropertyGroup>\n\
    <NoWarn>\$(NoWarn);MSB3245;MSB3243</NoWarn>\n\
  </PropertyGroup>\n\
</Project>|g" $projectPath/$packageName.csproj
fi

# Add generated project to root sln
dotnet sln $solution add $projectPath/

# Discard changes made to csproj file
git checkout $projectPath/$packageName.csproj

# Install SpaceBlocks.Libs.Sdk into AutoGenerated project
dotnet add $projectPath/$packageName.csproj package SpaceBlocks.Libs.Sdk

# Remove the Newtonsoft.Json dependency because it is already included in SpaceBlocks.Libs.Sdk
if grep -q "Newtonsoft.Json" "$projectPath/$packageName.csproj"; then
    dotnet remove "$projectPath/$packageName.csproj" package Newtonsoft.Json
fi

# Place partial class ApiClient`.cs
cat > $projectPath/Client/ApiClient\`.cs <<EOF
using System;
using RestSharp;
using SpaceBlocks.Libs.Sdk.Models;
using SpaceBlocks.Libs.Sdk.Providers;

namespace $packageName.Client
{
    public partial class ApiClient
    {
        private readonly SpaceBlocksAccessTokenProvider? _accessTokenProvider;
        private readonly string? _apiKey;

        public ApiClient(Uri baseUrl, string? apiKey = null, Uri? authUrl = null, AuthenticationOptions? authenticationOptions = null, TokenManagerOptions? tokenManagerOptions = null)
        {
            _baseUrl = baseUrl.ToString();
            _apiKey = apiKey;
            _accessTokenProvider =
                authUrl != null && authenticationOptions != null
                  ? new SpaceBlocksAccessTokenProvider(authUrl, authenticationOptions, tokenManagerOptions)
                  : null;
        }

        partial void InterceptRequest(RestRequest request)
        {
            if (_accessTokenProvider != null)
            {
                var accessToken = _accessTokenProvider?.GetAccessTokenAsync().Result;
                request.AddHeader("Authorization", $"Bearer {accessToken}");
            }

            if (_apiKey != null)
            {
                request.AddHeader("ApiKey", _apiKey);
            }
        }
    }
}
EOF
