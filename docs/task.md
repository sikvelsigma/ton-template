# Ton blockchain tasks

## Task 1

Develop a smart contract `Clicker` that counts how many times it was called

### Purpose

Purpose of this task is to familiarize yourself with how TON blockchain works, how to develop simple smart contracts and how to send transactions to blockchain itself

### Requirements

- `Clicker` should only accept a call with a special op `click` by anyone
- `Clicker` should keep the number of calls on storage
- the user should receive excess TON after operation completes

### Message chain

```mermaid
flowchart LR
	A0(("User"))
	A1{"Clicker"}

	A0 --> |op: click|A1
	A1 -.-> |op: excesses|A0
```

## Task 2

Develop a smart contract `Clicker` that counts how many times it was called by each individual user

### Purpose

Purpose of this task is to understand parent-child contract interaction 

### Requirements

- `Clicker` should only accept a call with a special op `click` by anyone
- the number of calls by each user should be tracked by a child contract `Tracker` for each user
- the `Clicker` should deploy `Tracker` contracts for each user on demand
- `Tracker` should only accept messages from `Clicker`
- the user should receive excess TON after operation completes

### Message chain

```mermaid
flowchart LR
	A0(("User"))
	A1{"Clicker"}
	A2["User<br/>Tracker"]

	A0 --> |op: click|A1
	A1 --> |op: internal_click|A2
	A2 -.-> |op: excesses|A0
```

## Task 3

Develop a smart contract `Clicker` that counts how many times it was called by a number of select users only

### Purpose

Purpose of this task is to familiarize yourself with how dictionaries work

### Requirements

- `click` op should be callable by a list of `allowed_addresses`
- `Clicker` should have a special `admin_address` address that is allowed to add and remove users from `allowed_addresses` dict
- `admin_address` is not included in `allowed_addresses` by default
- `Clicker` should keep the number of calls on storage
- the user should receive excess TON after operation completes

### Message chain

#### click op

```mermaid
flowchart LR
	A0(("User"))
	A1{"Clicker"}

	A0 --> |op: click|A1
	A1 -.-> |op: excesses|A0
```

#### add_user/remove_user op

```mermaid
flowchart LR
	A0(("User"))
	A1{"Clicker"}

	A0 --> |op: add_user/remove_user|A1
	A1 -.-> |op: excesses|A0
```

## Task 4

Develop a smart contract `Clicker` that counts how many votes we given for a list of options

### Purpose

Purpose of this task is to further familiarize yourself with parent-child contract interaction, how to verify the call came from a child contract, how payloads work

### Requirements

- `Clicker` should only accept a call with a special op `vote` by anyone
- the user sends `vote_id` as payload on `vote` op
- `Clicker` should keep in storage a dictionary with `vote_id -> number_of_votes`
- `Tracker` should keeps track for what option the user gave their vote
- the user can change their vote after it was given
- the user should receive excess TON after operation completes

### Message chain

```mermaid
flowchart LR
	A0(("User"))
	A1{"Clicker"}
	A2["User<br/>Tracker"]

	A0 --> |op: vote|A1
	A1 --> |op: internal_vote|A2
	A2 -.-> |op: excesses|A0
```

## Task 5

Develop a smart contract `Clicker` that counts how many votes we given for a list of options without using votes dictionary

### Purpose

Purpose of this task is to familiarize yourself a more complicated parent-child contract interaction with multiple contracts

### Requirements

- `Clicker` should only accept a call with a special op `vote` by anyone
- the user sends `vote_id` as payload on `vote` op
- how many votes were given for each option should be tracked on a `Vote_Option` contract
- `Tracker` should keeps track for what option the user gave their vote
- the user can change their vote after it was given
- the user should receive excess TON after operation completes

### Message chain

These schemes are one of the possible solutions (other solutions are possible)

#### initial vote

```mermaid
flowchart LR
	A0(("User"))
	A1{"Clicker"}
	A2["User<br/>Tracker"]
	A3[["Vote<br/>Option<br/>1"]]

	A0 --> |index: 0<br/>op: vote|A1
	A1 --> |index: 1<br/>op: check_vote|A2
	A2 -.-> |index: 2<br/>op: route_vote|A1
	A1 --> |index: 3<br/>op: add_vote|A3
    A3 -.-> |index: 4<br/>op: excesses|A0

	linkStyle 0 stroke:#ff4747,color:#ff4747
	linkStyle 1 stroke:#ff4747,color:#ff4747
	linkStyle 2 stroke:#02dbdb,color:#02dbdb
	linkStyle 3 stroke:#ff4747,color:#ff4747
	linkStyle 4 stroke:#0400f0,color:#0400f0

```

#### change vote

```mermaid
flowchart LR
	A0(("User"))
	A1{"Clicker"}
	A2["User<br/>Tracker"]
	A3[["Vote<br/>Option<br/>1"]]
	A4[["Vote<br/>Option<br/>2"]]

	A0 --> |index: 0<br/>op: vote|A1
	A1 --> |index: 1<br/>op: check_vote|A2
	A2 -.-> |index: 2<br/>op: route_vote|A1
	A1 --> |index: 3<br/>op: remove_vote|A3
	A1 --> |index: 4<br/>op: add_vote|A4
    A3 -.-> |index: 5<br/>op: excesses|A0
    A4 -.-> |index: 6<br/>op: excesses|A0

	linkStyle 0 stroke:#ff4747,color:#ff4747
	linkStyle 1 stroke:#ff4747,color:#ff4747
	linkStyle 2 stroke:#02dbdb,color:#02dbdb
	linkStyle 3 stroke:#ff4747,color:#ff4747
	linkStyle 4 stroke:#ff4747,color:#ff4747
	linkStyle 5 stroke:#0400f0,color:#0400f0
	linkStyle 6 stroke:#0400f0,color:#0400f0
```

## Materials

- [getting started](https://docs.ton.org/develop/smart-contracts/sdk/javascript)
- FunC [std lib](https://docs.ton.org/develop/func/stdlib)
- FunC [specification](https://docs.ton.org/develop/func/types)
- FunC [cookbook](https://docs.ton.org/develop/func/cookbook)
- [FunC lessons](https://github.com/romanovichim/TonFunClessons_Eng/tree/main/lessons/smartcontract)
- [some youtube lessons](https://www.youtube.com/watch?v=isfFGmyJvns&list=PLyDBPwv9EPsA5vcUM2vzjQOomf264IdUZ)

## Notes

### General

- install `Nodejs >= 18`
- you should familiarize yourself with `git` (you can use GitHub app or VsCode extension for repo management)
- you should publish your tasks on `GitHub`
- you should try using wallets from mnemonic, browser extension and tonkeeper mobile
- you can use testnet to deploy your contracts
- use this telegram bot to get testnet TON: https://t.me/testgiver_ton_bot

### Contracts

- you should always check if there's enough TON sent in a transaction to complete the whole message chain
- you should use [`@ston-fi/funcbox`](https://www.npmjs.com/package/@ston-fi/funcbox) for std FunC functions
- you should use [`@ton/blueprint`](https://www.npmjs.com/package/@ton/blueprint) for development environment
- you should test all you project's functionality in local sandbox
- you should create cli scripts to interact with contracts on-chain

### VsCode

- install this extension for intellisense: `VisualStudioExptTeam.vscodeintellicode`
- install this extension for packages intellisense: `christian-kohler.npm-intellisense`
- install this extension for FunC language support: `tonwhales.func-vscode`
- install this extension for markdown support: `yzhang.markdown-all-in-one`
- install this extension for mermaid graph support: `bierner.markdown-mermaid`
- install this extension to check your spelling: `streetsidesoftware.code-spell-checker`
- install this extension for better icons in a file tree: `vscode-icons-team.vscode-icons`
- press `Ctrl + /` to toggle comments in code

## Contract template

You can use [this template](https://github.com/sikvelsigma/ton-template) to start your projects or create basic project template with `npm create ton@latest` command