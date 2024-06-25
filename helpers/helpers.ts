import { SendMessageResult } from "@ton/sandbox";
import { BracketKeysType, createMdGraph, toGraphMap } from "./libs/graph";
import { nftMinterOpcodes } from "./libs/wrappers/NftMinter";
import { parseErrors, parseOp, stdFtOpCodes, stdNftOpCodes, tvmErrorCodes } from "./libs/codes";
import { nftOpcodes } from "./libs/wrappers/NftItem";
import { jWalletOpcodes } from "./libs/wrappers/JettonWallet";
import { jMinterOpcodes } from "./libs/wrappers/JettonMinter";
import { CliConfig, resolvers } from "./libs/config-helpers";

/*
    Use this function to create graphs from local sandbox transactions
*/

export function createMDGraphLocal(params: {
    msgResult: SendMessageResult,
    chartType?: "TB" | "LR" | "BT" | "RL", // default TB
    output: string,
    folderPath?: string,
    addressMap?: Map<string, string>,
    bracketMap?: Map<string, BracketKeysType>,
    hideOkValues?: boolean,
    displayValue?: boolean,
    displayTokens?: boolean,
    displayExitCode?: boolean,
    displayFees?: boolean,
    displayActionResult?: boolean,
    displayDeploy?: boolean,
    displayAborted?: boolean,
    displayDestroyed?: boolean,
    displaySuccess?: boolean,
    disableStyles?: boolean,
}) {
    // @ts-ignore
    if (typeof createMDGraphLocal.opMap == 'undefined') {
          // @ts-ignore
        createMDGraphLocal.opMap = toGraphMap({
            ...nftMinterOpcodes,
            ...stdFtOpCodes,
            ...stdNftOpCodes,
            ...nftOpcodes,
            ...jWalletOpcodes,
            ...jMinterOpcodes,
            ...parseOp("contracts/common/op.fc")
        });
    }
    // @ts-ignore
    if (typeof createMDGraphLocal.errorMap == 'undefined') {
        // @ts-ignore
        createMDGraphLocal.errorMap = toGraphMap({
            ...tvmErrorCodes,
            ...parseErrors("contracts/common/errors.fc")
        });
    }

    params.folderPath = params.folderPath ?? "build/graph/"
    const details = true

    createMdGraph({
        chartType: params.chartType ?? "TB",
        hideOkValues: params.hideOkValues ?? true,
        displayValue: params.displayValue ?? details,
        displayTokens: params.displayTokens ?? details,
        displayExitCode: params.displayExitCode ?? details,
        displayFees: params.displayFees ?? details,
        displayActionResult: params.displayActionResult ?? details,
        displayAborted: params.displayAborted ?? details,
        displayDeploy: params.displayDeploy ?? false,
        displayDestroyed: params.displayDestroyed ?? false,
        displaySuccess: params.displaySuccess ?? false,
        disableStyles: params.disableStyles ?? false,
        showOrigin: false,
        msgResult: params.msgResult,
        output: `${params.folderPath}${params.output}.md`,
        addressMap: params.addressMap,
        bracketMap: params.bracketMap,
        // @ts-ignore
        opMap: createMDGraphLocal.opMap,
        // @ts-ignore
        errMap: createMDGraphLocal.errorMap,
        // feeDetails: true,
    });
}


// config for working on-chain
const configParams = {
    mainAddress: resolvers.address,
};
export const cliConfig = new CliConfig(configParams)