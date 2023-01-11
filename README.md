# ScapeGroat: A Decentralized Reverse Lottery for Ethereum

[![Tests](https://github.com/tmisirpash/scapegroatv2/actions/workflows/tests.yml/badge.svg)](https://github.com/tmisirpash/scapegroatv2/actions/workflows/tests.yml)
[![Lint](https://github.com/tmisirpash/scapegroatv2/actions/workflows/lint.yml/badge.svg)](https://github.com/tmisirpash/scapegroatv2/actions/workflows/lint.yml)

![0](https://user-images.githubusercontent.com/60826286/211216889-dc1e35ca-ae78-4994-b823-d2944a94e505.png)

ScapeGroat is a protocol implemented on Ethereum that models a game of chance where out of n players, there is only one loser. At the beginning of every game, n players agree to deposit a certain stake s into a contract. Once all players have added their funds, a period of time goes by during which Ethereum's built-in RANDAO (introduced with the Proof-of-Stake upgrade) accumulates randomness. The RANDAO value is used to choose the loser (the "scapegroat"), who loses the entirety of their stake. All other players receive their stake back in addition to an equal portion of the amount the scapegroat lost.

The name "ScapeGroat" is a combination of "scapegoat" and "groat", a type of medieval coin.

To get the app running on your machine, run

`npm install`

`npm run dev`

and navigate to `localhost:8080`.
