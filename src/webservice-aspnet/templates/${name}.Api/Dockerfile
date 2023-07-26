#######################################################
# Step 1: Build the application in a container        #
#######################################################

FROM mcr.microsoft.com/dotnet/sdk:5.0 as build

ARG NUGET_TOKEN
ARG CONFIGURATION=Release
ARG SKIP_TESTS=false

# Copy .sln and .csproj files for NuGet restore
COPY src/*.sln src/
COPY src/*.props src/
COPY src/webservices/<%= folder %>/<%= name %>.Api/<%= name %>.Api.csproj src/webservices/<%= folder %>/<%= name %>.Api/
COPY src/webservices/<%= folder %>/<%= name %>.Core/<%= name %>.Core.csproj src/webservices/<%= folder %>/<%= name %>.Core/
COPY src/webservices/<%= folder %>/<%= name %>.Core.UnitTests/<%= name %>.Core.UnitTests.csproj src/webservices/<%= folder %>/<%= name %>.Core.UnitTests/

# Restore NuGet packages
RUN dotnet nuget add source https://nuget.pkg.github.com/wemogy/index.json --name wemogy --username wemogy --password $NUGET_TOKEN --store-password-in-clear-text
RUN dotnet restore src/webservices/<%= folder %>/<%= name %>.Api/<%= name %>.Api.csproj
RUN dotnet restore src/webservices/<%= folder %>/<%= name %>.Core.UnitTests/<%= name %>.Core.UnitTests.csproj

# Copy the rest of the files over
COPY . .

# Build the application
WORKDIR /src/webservices/<%= folder %>/<%= name %>.Api/
RUN dotnet publish --output /out/ --configuration $CONFIGURATION

#######################################################
# Step 2: Run the build outcome in a container        #
#######################################################

FROM mcr.microsoft.com/dotnet/aspnet:5.0

EXPOSE 80
COPY --from=build /out .

# Start the application
ENTRYPOINT ["dotnet", "<%= name %>.Api.dll"]
