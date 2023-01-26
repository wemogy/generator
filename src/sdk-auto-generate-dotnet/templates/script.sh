#!/bin/bash

solution=$1
webservice=$2
swagger=$3
targetDirectory=$4
packageName=$5

autoGeneratedPackageName=$packageName.AutoGenerated
autoGeneratedProjectPath=$targetDirectory/$autoGeneratedPackageName

openApiConfigPath=$targetDirectory/.openapi-generator/csharp-netcore.yaml

# Create target path
mkdir -p $targetDirectory/.openapi-generator

# Generate config file for openapi-generator
cat > $openApiConfigPath <<EOF
additionalProperties:
  library: restsharp
  nullableReferenceTypes: true
  packageName: $autoGeneratedPackageName
  packageVersion: 1.0.0
  targetFramework: netstandard2.1
  nonPublicApi: false # Can be set to true for rich SDKs, where the API should not be exposed to the user directly
EOF

# Generate swagger.json
dotnet build $webservice -c Release

# C#
openapi-generator generate \
  -i $swagger \
  -o $targetDirectory \
  -g csharp-netcore \
  -c $openApiConfigPath

# Remove generated SLN
rm $targetDirectory/*.sln
rm $targetDirectory/.gitignore
rm $targetDirectory/appveyor.yml
rm $targetDirectory/git_push.sh
rm $openApiConfigPath

# Remove generated src folder nesting
mv $targetDirectory/src/* $targetDirectory
rm -r $targetDirectory/src

# remove generated test project
rm -r $targetDirectory/$autoGeneratedPackageName.Test

# fix warning in generated code
# if not already fixed

if ! grep -q ";MSB3245;MSB3243" $autoGeneratedProjectPath/$autoGeneratedPackageName.csproj; then
sed -i '' "s|</Project>|\n\
  <PropertyGroup>\n\
    <NoWarn>\$(NoWarn);MSB3245;MSB3243</NoWarn>\n\
  </PropertyGroup>\n\
</Project>|g" $autoGeneratedProjectPath/$autoGeneratedPackageName.csproj
fi

# Add generated project to root sln
dotnet sln $solution add $autoGeneratedProjectPath/

# Install SpaceBlocks.Libs.Sdk into AutoGenerated project
dotnet add $autoGeneratedProjectPath/$autoGeneratedPackageName.csproj package SpaceBlocks.Libs.Sdk

# Place partial class ApiClient`.cs
cat > $autoGeneratedProjectPath/Client/ApiClient\`.cs <<EOF
using System;
using RestSharp;
using SpaceBlocks.Libs.Sdk.Models;
using SpaceBlocks.Libs.Sdk.Providers;

namespace $autoGeneratedPackageName.Client
{
    public partial class ApiClient
    {
        private readonly SpaceBlocksAccessTokenProvider _accessTokenProvider;

        public ApiClient(Uri baseUrl, Uri authUrl, AuthenticationOptions authenticationOptions)
        {
            _baseUrl = baseUrl.ToString();
            _accessTokenProvider = new SpaceBlocksAccessTokenProvider(
                authUrl,
                authenticationOptions);
        }

        partial void InterceptRequest(RestRequest request)
        {
            var accessToken = _accessTokenProvider.GetAccessTokenAsync().Result;
            request.AddHeader("Authorization", $"Bearer {accessToken}");
        }
    }
}
EOF
