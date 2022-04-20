# dapps-learning
Collection of dapps projects I build while learning dapps development

# Contracts

`truffle` folder has a truffle workspace with my contracts and their tests. Probably all of my contracts are going to live inside there. 

## GalaxyWar

A simple fund&attack contract to explore Ethereum VM, Truffle, Ganache and testing. Never finished, no intention of doing that, just a playground with tests. *Do not copy or use in real network. It's not tested or even a real work!*


## SmartWallet

A contract developed as a project for the course. Allows you to deposit money and set up allowances for other people. Every person has internal balance that can be withdrawn from. Every person also has a list of allowances. Allowances can be set more than wallet's worth to account for future income. E.g. you can set allowance for 1 eth and only have 0.1, and user will be able to withdraw only 0.1, but in case you add 0.5 in the future, you don't need to re-set the allowance.


