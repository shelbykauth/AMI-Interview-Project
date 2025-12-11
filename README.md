# Software Developer Applicant Assessment - AMI

The goal is to create a Single Page weather application.

# Running the Application

## Dev Mode

How to launch and hot-reload the application on a workstation during development

### Prerequisitses:

- (git should be installed if this were a normal onboarding)
- Dotnet 10 SDKs should be installed.
  - Visit https://dotnet.microsoft.com/en-us/download/dotnet/10.0
  - Verify by running `dotnet --version` or `dotnet --list-sdks` in the command line.
- Node.js should be installed, ideally the latest LTS (currently 24, minimum 20)
  - Visit https://nodejs.org/en/download or, if you're on Mac, run `brew install node`
  - Verify by running `node --version` in the command line
- Download and Extract, or Clone, the project folder.
  - Download at https://github.com/shelbykauth/AMI-Interview-Project/releases/ and extract into desired workspace, then enter folder.
  - OR: In a CLI window, navigate to desired workspace, run `git clone git@github.com:shelbykauth/AMI-Interview-Project.git ./desired-folder-name` and `cd` into the new folder.

### Backend:

- In a CLI window, navigate to the `backend` folder.
- _(in a full application, you would store the base URL and API key for the external service in one of the many configuration locations for dotnet. Such as `dotnet user-secrets set "EXTERNAL_URL" "<url>"`, but for this case, the configuration is non-sensitive and static)_
- Run `dotnet user-secrets set "ExternalService:Domain" "<secret>"` (secret in email)
- Run `dotnet run` (to run once, or if you want to rebuild when you make changes, run `dotnet watch` instead)
- You can test that the backend is working by going to http://localhost:5046/swagger/index.html, (or `<specified_domain>/swagger/index.html`, where specified_domain is the protocol, hostname, and port if you're accessing from a separate machine)

### Frontend:

- In a CLI window, navigate to the `frontend` folder.
- Run `npm install` (at least the first time)
- Run `npm start`
- After frontend and backend is spun up, open http://localhost:4200
- For testing on other machines (such as your phone) on the same LAN, use `npm start -- --host <host> -c=proxyApi`
  - `<host>` should be the hostname of your computer (eg your computer name, you can find this by running `hostname`). Note: for MacOS, it should be `<hostname>.local`, eg `shelbyworkstation01.local`
  - `-c=proxyApi` activates the proxy to the backend, so the client machine doesn't need to know.
  - Instead of http://localhost:4200, go to `http://<host>.local:4200`
  - This setup is specific to running the Angular dev server with `npm start`. The proxy config does not apply to the built production application. It also should be used somewhat sparingly.

### Troubleshooting:

- frontend: `The Angular CLI requires a minimum Node.js version of ...`
  - Update Node.js
- backend: `backend\backend.csproj : error NU1100: Unable to resolve 'Microsoft.AspNetCore.OpenApi (>= 10.0.1)' for 'net10.0'.`
  - You probably don't have nuget sources installed. (Verify with `dotnet nuget list source`).
  - Run `dotnet nuget add source "https://api.nuget.org/v3/index.json" --name "nuget.org"`

## Deployment Overview

Overview for how one would deploy the project using CI/CD or Manual processes.

- Same prerequisites apply: Node.js and Dotnet SDKs should be installed. _(if frontend and backend are built on separate machines, Node and Dotnet only need to be installed on the respective machines.)_
- Ideally, a clean copy of the project will be checked out at the beginning of each deploy.
- In the backend
  - Run `dotnet publish`
  - Store `./backend/bin/Release/net10.0/publish` as an artifact.
  - In a later step, copy the contents of the above artifact to the appropriate location to serve the application
- In the frontend
  - Run `npm ci` to do a clean install.
  - Run `npm run build`
  - Store `./frontend/dist/frontend/browser` as an artifact
  - In a later step, copy the contents of the above artifact to the appropriate location to serve static files.
- Running the prebuilt application
  - The frontend application does _Not_ need Node.js installed in order to run, only to build. You can serve the files on your static hosting of choice. Immediately after copying the files from the artifact to the destination, write appropriate environment variables to config.json
  - The backend application _Does_ need Dotnet installed in order to run. If it needs to run without Dotnet installed, then the build process must be modified to produced a self-contained product

# Specs

- Frontend
  - Layout
    - Form and two buttons - "Add" and "Refresh" (maybe make form minimizable, with top bar labeling the form)
    - flex grid of cards for each city's weather data (maybe skeleton loader, and a 'last updated at' timestamp above, and maybe a way to remove cards)
    - line-chart below
  - Mobile Friendly (just in case)
  - Configurable backend endpoint location
- Backend
  - C# .NET Web Server
  - REST API endpoint mirroring weather by location
  - No CORS blocking (test this on separate device with hostname)
- Deliverables
  - Single zip file, uploaded to web (I'm going to use git release.)
    - Zip should contain the source code
  - Documentation on how to run

# Idealized Features that may be over-engineered for this assessment

- [ ] Use OpenStreetMap to warn on invalid city/state/zips and/or suggest valid city/state/zips
- [x] Mobile Friendly interface (might be easy to include by default)
- [ ] ~~Cache external API requests (but maybe not because we don't have a datastore to use)~~
