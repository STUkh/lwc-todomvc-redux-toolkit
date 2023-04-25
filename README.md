# 💡 Salesforce lwc-todomvc 

☁️ Salesforce LWC TodoMVC example. Great way to start your SF LWC project. This guide implements full-featured example from [todomvc.com](https://todomvc.com/) and using almost all features from LWC like *modules*, *composition*, *reactivity*, *events*, *component lifecycle events* and even *test example*.

Start this project if you like it ⭐

## ℹ️ Easy to develop 

No need to setup any salesforce external environments!!! Start building full-featured LWC components locally without overhead.
## ⚙️ How to start?

Start simple by running `yarn watch` (or `npm run watch`, if you set up the project with `npm`). This will start the project with a local development server.

The source files are located in the [`src`](./src) folder. All web components are within the [`src/modules`](./src/modules) folder. The folder hierarchy also represents the naming structure of the web components.

Find more information on the main repo on [GitHub](https://github.com/muenzpraeger/create-lwc-app).

## 📙 More information

For More info about LWC visit [lwc.dev](https://lwc.dev/) or [Salesforce Developers LWC page](https://developer.salesforce.com/docs/component-library/documentation/en/lwc/lwc.get_started_introduction)


## Detailed steps

#### 1. Install Salesforce CLI:
Download and install the Salesforce CLI (Command Line Interface) for your operating system from this link: https://developer.salesforce.com/tools/sfdxcli

#### 2. Install Visual Studio Code and Salesforce Extension Pack:
Download and install Visual Studio Code (VSCode) from this link: https://code.visualstudio.com/download
Once installed, open VSCode, go to the Extensions view by clicking on the square icon in the Activity Bar on the side of the window. Search for "Salesforce Extension Pack" and install it.

#### 3. Create a new Salesforce DX project:
In VSCode, press Ctrl+Shift+P (Windows/Linux) or Cmd+Shift+P (Mac) to open the Command Palette. Type "SFDX" and select "SFDX: Create Project with Manifest". Choose a project template, enter a project name, and choose a folder to store the project.

#### 4. Authorize your Dev Hub org:
Open the terminal in VSCode (View -> Terminal) and run the following command to authorize your Dev Hub org:

```
sfdx force:auth:web:login -d -a DevHub
```
This command opens the Salesforce login page in your default web browser. Log in with your Dev Hub org credentials. After successful authentication, you can close the browser tab and return to VSCode.

#### 5. Create a scratch org:
In VSCode terminal, run the following command to create a scratch org:

```
sfdx force:org:create -s -f config/project-scratch-def.json -a MyScratchOrg
```

Replace MyScratchOrg with a name of your choice for the scratch org. The -s flag sets the created scratch org as the default org for the project.

#### 6. Push your LWC app to the scratch org:
Move your LWC example app into the force-app/main/default/lwc directory of your Salesforce DX project. Then, in the VSCode terminal, run the following command to push your LWC app to the scratch org:

```
sfdx force:source:push
```

Run command above each time you want to deploy your app changes.

Create a Lightning App Page:
Open your scratch org by running the following command in the VSCode terminal:

```
sfdx force:org:open
```

#### 7. Install packages for local LWC development:
This project contains both `Webpack` and `Rollup` configurations for local development.
Install JS packages for local development:

```
npm install
```

Note: For local development - register new components in `lwc.config.json`

#### 8.1.Run app locally:

Run `npm run watch` or `npm run watch:rollup` to run project with webpack and rollup respectively.
Project will be available in `http://localhost:9000` for webpack and `http://localhost:3000` for rollup.


#### 8.2.Run app locally with salesforce:

Install the LWC Local Development plugin by running this command in your terminal or command prompt:

```
sfdx plugins:install @salesforce/lwc-dev-server
```

Then run the following command to start the local development server with salesforce tool:

```
sfdx force:lightning:lwc:start
```

Project will be available at `http://localhost:3333`


Remember that LWC Local Development doesn't support all Salesforce features, and some components may not work as expected in this environment. Always test your components directly in your Salesforce org before deploying them to production.

#### 9. Run unit tests

Unit tests runner ready for use with a few examples for `todoApp` component.
`wireAdapter` testing example included.

```
npm run test:unit       - to single run unit tests
npm run test:unit:debug - to debug unit tests with browser. Allow to set breakpoints
npm run test:unit:watch - to run tests in watch mode. Test file will be re-executed on changes
```