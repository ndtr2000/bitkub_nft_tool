import "@nomicfoundation/hardhat-chai-matchers";
import "@nomiclabs/hardhat-truffle5";
import "@nomiclabs/hardhat-web3";
import "@nomiclabs/hardhat-solhint";
import "@nomiclabs/hardhat-etherscan";
import "@openzeppelin/hardhat-upgrades";
import "@typechain/hardhat";
import "@nomicfoundation/hardhat-toolbox";
import "solidity-coverage";
import * as dotenv from "dotenv";
import { HardhatUserConfig } from "hardhat/types";
import "hardhat-docgen";
import "hardhat-gas-reporter";

dotenv.config();

const config: HardhatUserConfig = {
    defaultNetwork: "hardhat",
    networks: {
        hardhat: {
            accounts: { count: 10 },
        },
        bktestnet: {
            url: `https://rpc-testnet.bitkubchain.io/`,
            accounts: [`${process.env.PRIVATE_KEY}`],
        },
        bkmainnet: {
            url: `https://dataseed.bitkubchain.org/`,
            accounts: [`${process.env.PRIVATE_KEY}`],
        },
    },
    solidity: {
        compilers: [
            {
                version: "0.8.17",
                settings: {
                    optimizer: {
                        enabled: true,
                        runs: 200,
                        // details: {
                        //     yul: true,
                        // },
                    },
                    // viaIR: true,
                },
            },
        ],
    },
    paths: {
        sources: "./contracts",
        tests: "./tests",
        cache: "./cache",
        artifacts: "./artifacts",
    },
    mocha: {
        timeout: 200000,
        reporter: "mocha-multi-reporters",
        reporterOptions: {
            configFile: "./mocha-report.json",
        },
    },
    docgen: {
        path: "./docs",
        clear: true,
        runOnCompile: false,
    },
    gasReporter: {
        currency: "ETH",
        gasPrice: 10,
        enabled: process.env.REPORT_GAS ? true : false,
        excludeContracts: [],
        src: "./contracts",
    },
    typechain: {
        outDir: "typechain-types",
        target: "ethers-v5",
    },
};

module.exports = config;
