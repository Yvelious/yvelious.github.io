module.exports = {
  apps: [
    {
      name: "webpack-dev-server",
      cwd: "/Volumes/SSD/projects/yvelious_github_io", // ← path to the project in remote maschine
      script: "npm",
      args: "run server-remote",
      env: {
        NODE_ENV: "server",
      },
      watch: false, // watch has yet in webpack config
    },
  ],
};
