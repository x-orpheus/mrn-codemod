#!/usr/bin/env node
const execa = require("execa");
const readdir = require("readdir");
const fs = require('fs');
const path = require("path");
const jscondeshiftbin = require.resolve(".bin/jscodeshift");
const chalk = require("chalk");
const isGitClean = require("is-git-clean");

// check git safety
function checkGitSafety(){
    const isClean = isGitClean.sync(process.cwd());
    if (!isClean) {
        console.log(chalk.red(`Please commit or stash your code`));
        process.exit(1);
    }
}

// check sourceDirectory
function checkSourceDirectoryExists(sourceDirectory){
    const sourceDir = path.resolve(process.cwd(), sourceDirectory);
    console.log(`The input sourceDirectory is ${sourceDir}`);
    if(!fs.existsSync(sourceDir)){
        console.log(chalk.red(`Please make sure sourceDirectory is available`));
        process.exit(1);
    }
}

// run transform
function transform(sourceDirectory,options){
    const sourceDir = path.resolve(process.cwd(), sourceDirectory);
    const ruleDir = path.resolve(__dirname, "../transform");
    let ruleList = readdir.readSync(ruleDir, ["*.js"], readdir.ABSOLUTE_PATHS);

    //filter navbar.js and listview which are both only for our own business.
    if(!(options && options.music)){
        ruleList = ruleList.filter(item=>{
            return item.indexOf("navbar") == -1 || item.indexOf("listview") == -1
        })
    }

    ruleList.forEach(item => {
        let args = [];
        args.push("--ignore-pattern=**/node_modules/**");
        args.push("--parser=babel");
        args.push("--verbose=2");
        args.push("--print=true");
        args.push("--transform=" + item);
        args = args.concat(sourceDir);

        const result = execa.sync(jscondeshiftbin, args, {
            stdio: "inherit",
            stripEof: false,
        });

        if (result.error) {
            console.error(chalk.red(result.error));
        }
    });
}

const runTransfrom = function(sourceDirectory, options) {
    const {force} = options;

    if(!force)  checkGitSafety();

    checkSourceDirectoryExists(sourceDirectory);

    transform(sourceDirectory,options);
};

module.exports = runTransfrom