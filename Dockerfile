# See here for image contents: https://github.com/microsoft/vscode-dev-containers/tree/v0.209.6/containers/java/.devcontainer/base.Dockerfile

# [Choice] Java version (use -bullseye variants on local arm64/Apple Silicon): 11, 17, 11-bullseye, 17-bullseye, 11-buster, 17-buster
# ARG VARIANT="11"
# FROM mcr.microsoft.com/vscode/devcontainers/java:0-${VARIANT}

# # [Option] Install Maven
# ARG INSTALL_MAVEN="false"
# ARG MAVEN_VERSION=""
# # [Option] Install Gradle
# ARG INSTALL_GRADLE="false"
# ARG GRADLE_VERSION=""
# RUN if [ "${INSTALL_MAVEN}" = "true" ]; then su vscode -c "umask 0002 && . /usr/local/sdkman/bin/sdkman-init.sh && sdk install maven \"${MAVEN_VERSION}\""; fi \
#     && if [ "${INSTALL_GRADLE}" = "true" ]; then su vscode -c "umask 0002 && . /usr/local/sdkman/bin/sdkman-init.sh && sdk install gradle \"${GRADLE_VERSION}\""; fi

# # [Choice] Node.js version: none, lts/*, 16, 14, 12, 10
# ARG NODE_VERSION="none"
# RUN if [ "${NODE_VERSION}" != "none" ]; then su vscode -c "umask 0002 && . /usr/local/share/nvm/nvm.sh && nvm install ${NODE_VERSION} 2>&1"; fi

# [Optional] Uncomment this section to install additional OS packages.
# RUN apt-get update && export DEBIAN_FRONTEND=noninteractive \
#     && apt-get -y install --no-install-recommends <your-package-list-here>

# [Optional] Uncomment this line to install global node packages.
# RUN su vscode -c "source /usr/local/share/nvm/nvm.sh && npm install -g <your-package-here>" 2>&1
FROM adoptopenjdk/openjdk11:jdk-11.0.10_9-alpine

# Set the working directory
WORKDIR /app

# Copy the built jar file to the working directory
COPY target/*.jar app.jar

# Expose the port that the app will listen on
EXPOSE 80

# Run the app
CMD ["java", "-jar", "app.jar"]
