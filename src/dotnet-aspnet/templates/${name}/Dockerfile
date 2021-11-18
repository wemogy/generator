#######################################################
# Step 1: Build the application in a container        #
#######################################################

FROM mcr.microsoft.com/dotnet/sdk:5.0 as build

ARG NUGET_USERNAME
ARG NUGET_TOKEN

# Copy .csproj files for NuGet restore
COPY <%= parentPath %>/*/*.csproj ./
RUN for file in $(ls *.csproj); do mkdir -p <%= parentPath %>/${file%.*}/ && mv $file <%= parentPath %>/${file%.*}/; done

# Restore NuGet packages
RUN dotnet nuget add source https://nuget.pkg.github.com/wemogy/index.json --name wemogy --username $NUGET_USERNAME --password $NUGET_TOKEN --store-password-in-clear-text
RUN dotnet restore <%= parentPath %>/<%= name %>/<%= name %>.csproj
<% if(unitTests) { %>RUN dotnet restore <%= parentPath %>/<%= name %>.Tests/<%= name %>.Tests.csproj<% } %>

# Copy the rest of the files over
COPY . .

<% if(unitTests) { %># Run unit tests
WORKDIR /<%= parentPath %>/<%= name %>.Tests/
RUN dotnet test --configuration Release<% } %>

# Build the application
WORKDIR /<%= parentPath %>/<%= name %>/
RUN dotnet publish --output /out/ --configuration Release

#######################################################
# Step 2: Run the build outcome in a container        #
#######################################################

FROM mcr.microsoft.com/dotnet/aspnet:5.0

EXPOSE 80
COPY --from=build /out .

# Start the application
ENTRYPOINT ["dotnet", "<%= name %>.dll"]
