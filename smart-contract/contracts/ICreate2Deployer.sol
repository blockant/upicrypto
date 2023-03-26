// SPDX-License-Identifier: MIT
pragma solidity 0.8.13;

/**
 * create2-based deployer (eip-2470)
 */
interface ICreate2Deployer {
    function deploy(bytes memory initCode, bytes32 salt) external returns (address);
}
