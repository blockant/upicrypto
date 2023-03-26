// SPDX-License-Identifier: MIT-only
pragma solidity 0.8.13;

import {IPaymaster} from "./IPaymaster.sol";

interface IPayMaster is IPaymaster {
    /// @notice Get the Paymaster stake on the entryPoint, which is used for DDOS protection
    function getStake() external view returns (uint112);

    /// @notice Get the Paymaster deposit on the entryPoint, which is used to pay for gas
    function getDeposit() external view returns (uint112);
}
