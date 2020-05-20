#!/usr/bin/env node
const program = require("commander");
const chalk = require("chalk");
const packageJson = require("../package.json");
const semver = require("semver");
const runTransfrom = require("./transfrom");

/**node version check */
var currentVersion = process.versions.node;

const isGte = semver.gte(currentVersion, "9.7.0");

if (!isGte) {
    console.warn(
        chalk.red(
            "This project requires execa lib which invoke util." +
                "getSystemErrorName that was added from Node 9.7.0. \n" +
                "Your current Node version is " +
                currentVersion +
                ". Please update your Node version",
        ),
    );
    process.exit(1);
}

/** rn-codemod transform directory --options*/
program
    .version(packageJson.version)
    .description("Codemods for updateing ReactNative projects")
    .command("transform <sourceDirectory>")
    .option("-f, --force", "Bypass Git safety checks and forcibly run codemods")
    .option(
        "-m --music",
        "Some legacy private custom logical about navbar  , please check the navbar test before you  want to use",
    )
    .action(runTransfrom);

program.on("--help", function() {
    console.log("");
    console.log("Examples:");
    console.log("  $ rn-codemod transform src");
    console.log("  $ rn-codemod transform src -f");
});

program.parse(process.argv);
