# Yeoman Code Generator

![npm](https://img.shields.io/npm/v/generator-wemogy)

## Get it running

Install [Yeoman]() via NPM

```bash
npm install -g yo
```

Now install the generator

```bash
npm install -g generator-wemogy
```

```bash
yo wemogy
```

## What can be generated?

### New wemogy project

Choose these to generate a new project for a wemogy repository. They will automatically create the correct folder structure.

> **Hint:** Please make sure to call these generators from the repository root.

| Type | Description | Folder | Direct command |
|---|---|---|---|
| Empty project structure | Scaffolds the basic components of every repository like EditorConfig and Readme. | `/` | `yo wemogy:project-empty` |
| Web Service (.NET) | ASP.NET Web Api project to create small services | `src/webservices/...` | `yo wemogy:project-webservice-dotnet` |
| Class Library (.NET) | .NET Class Library for shared components. | `src/shared/...` | `yo wemogy:project-lib-dotnet` |
| SDK (.NET) | .NET Class Library to create an SDK for other .NET projects | `src/sdk/dotnet/...` | `yo wemogy:project-sdk-dotnet` |
| SDK (JavaScript) | TypeScript project to create an SDK for other JavaScript projects | `src/sdk/javascript/...` | `yo wemogy:project-sdk-javascript` |
| Frontend (React) | A web frontend based on React. | `src/frontend/...` | `yo wemogy:project-frontend-react` |

### Other templates

Choose these to generate basic templates for specific technologies. They will not generate any specific folder structure.

| Category | Type | Description | Direct command |
|---|---|---|---|
| .NET | Solution |  | `yo wemogy:dotnet-solution` |
| .NET | Class Library |  | `yo wemogy:dotnet-classlib` |
| .NET | ASP.NET Web Api |  | `yo wemogy:dotnet-aspnet` |
| .NET | xUnit Tests |  | `yo wemogy:dotnet-xunit` |
| GitHub Actions | Action for .NET Builds |  | `yo github-actions-action-build-dotnet` |
| GitHub Actions | Action for JavaScript Builds |  | `yo github-actions-action-build-javascript` |
| GitHub Actions | Action to Build and Push Containers |  | `yo github-actions-action-containers` |
| GitHub Actions | Workflow for Builds |  | `yo github-actions-workflow-build` |
| GitHub Actions | Workflow for Releases |  | `yo github-actions-workflow-release` |
| Terraform | Azure Kubernetes Service (AKS) |  | `yo wemogy:terraform-aks` |
| Terraform | Kubernetes Cluster configuration |  | `yo wemogy:terraform-kubernetes` |
| TypeScript | Empty |  | `yo wemogy:typescript-empty` |
| TypeScript | React |  | `yo wemogy:typescript-react` |
| Documentation | Docusaurus |  | `yo wemogy:docs-docusaurus` |
| Yeoman | Selector Generator |  | `yo wemogy:yeoman-selector` |
| Yeoman | Template Generator (Generic) |  | `yo wemogy:yeoman-template` |
| Yeoman | Template Generator (.NET) |  | `yo wemogy:yeoman-template-dotnet` |
| Yeoman | Project Template Generator (Generic) |  | `yo wemogy:yeoman-template-project` |
| Yeoman | Project Template Generator (.NET) |  | `yo wemogy:yeoman-template-project-dotnet` |

## Development

Open a Terminal at the repository root and run the following commands.

```bash
yarn install
```

Start the development using the following command in the root directory.

```bash
yarn develop
```

To test the generator, create a `test` folder in the same repository at root level

```bash
mkdir test
cd test
```

Now link the generator

```bash
yarn link
yarn link generator-wemogy
```

Run the following command to start and test the generator

```bash
yo wemogy
```

To remove the linked generator, run the following command

```bash
yarn unlink

# Check, if removal was successful
npm list -g --depth=0
```
