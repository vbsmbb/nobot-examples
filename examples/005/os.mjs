import { homedir, platform, cpus } from "os";

const homeDirectory = homedir();
console.log(`Your home directory is: ${homeDirectory}`);

const osPlatform = platform();
console.log(`The OS platform is: ${osPlatform}`);

const cpuCores = cpus();
const coreCount = cpuCores.length;
const cpuModel = cpuCores[0].model;

console.log(`I can see your ${cpuModel} has ${coreCount} cores.`);
