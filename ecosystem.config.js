module.exports = {
  apps: [{
    name: "demo-api",
    node_args: "--max-old-space-size=4096",
    script: "/usr/src/app/dist/src/index.js",
    exec_mode: "fork",
    watch: false,

    log_date_format: "YYYY-MM-DD HH:mm Z",
    error_file: "/usr/src/app/logs/api-error.log",
    out_file:"/usr/src/app/logs/api-out.log",
    instances: 1,
    autorestart: true
  }]
}