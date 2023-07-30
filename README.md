# AVRateNG

AVRateNG is a video, image, and general multimedia rating system, based on a simple web interface. AVRateNG was inspired by AVrate.

This repository is a modern and new implementation of the already existing [project](https://github.com/Telecommunication-Telemedia-Assessment/avrateNG/tree/master). Check it out to learn more.

## Requirements

- Operating system: Windows, Linux or macOS
- Installation of [node.js](https://nodejs.org/de)

Furthermore you also need a player like mpv. You can install it with the following commands:
- Linux or macOS: `sudo apt-get install mpv` or `brew install mpv`
- Windows: `choco install mpv`

## First steps

Create a folder named `videos` in the `frontend` directory. In this folder, create two new directories named `rating` and `training`. Now you can add the video sets in its own folders. The folder structure could look like this: 

```
videos
    └─ rating
    │   └─ set_0
    │   │   └─ rabbit_10fps.mkv
    │   │   └─ rabbit_20fps.mkv
    │   │   └─ rabbit_30fps.mkv
    │   │   └─ rabbit_60fps.mkv
    │   │   └─ rabbit_120fps.mkv
    │   └─ set_1
    │   └─ set_2
    └─ training
        └─ set_0
        └─ set_1
```

Before you can start the server, you have to run through the following steps:
- `yarn install` to install all dependencies
- `cd frontend && yarn drizzle:push && cd ..` to create the database
- `yarn turbo build` to create a production build of the server
- `yarn turbo start` to start the server

All ratings are stored in a sqlite database. To view it's contents, navigate to the `frontend` folder with `cd frontend` and start the database viewer with `yarn drizzle:studio` and open the printed url. There you can also export the data to formats like `csv`.

Now everything should be set up correctly.
