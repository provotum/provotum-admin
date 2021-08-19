# pull official base image
FROM node:13.12.0-alpine

# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install app dependencies
COPY package.json ./
COPY package-lock.json ./
RUN npm install
RUN npm install react-scripts@3.4.1 -g

# add app
COPY . ./

ARG REACT_APP_VA_URL
ARG REACT_APP_VA_KEY

ENV REACT_APP_VA_URL $REACT_APP_VA_URL
ENV REACT_APP_VA_KEY $REACT_APP_VA_KEY

EXPOSE 3011

# start app
CMD ["npm", "run", "start_test"]
