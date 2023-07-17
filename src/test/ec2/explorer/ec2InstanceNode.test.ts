/*!
 * Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */

import * as assert from 'assert'
import { Ec2InstanceNode } from '../../../ec2/explorer/ec2InstanceNode'
import { Ec2Instance, getNameOfInstance } from '../../../shared/clients/ec2Client'

describe('ec2InstanceNode', function () {
    let testNode: Ec2InstanceNode
    let testInstance: Ec2Instance

    before(function () {
        testInstance = {
            InstanceId: 'testId',
            Tags: [
                {
                    Key: 'Name',
                    Value: 'testName',
                },
            ],
        }

        testNode = new Ec2InstanceNode('testRegion', 'testPartition', testInstance)
    })

    it('instantiates without issue', async function () {
        assert.ok(testNode)
    })

    it('initializes the region code', async function () {
        assert.strictEqual(testNode.regionCode, 'testRegion')
    })

    it('initializes the label', async function () {
        assert.strictEqual(testNode.label, `${getNameOfInstance(testInstance)} (${testInstance.InstanceId})`)
    })

    it('initializes the functionName', async function () {
        assert.strictEqual(testNode.name, getNameOfInstance(testInstance))
    })

    it('initializes the tooltip', async function () {
        assert.strictEqual(testNode.tooltip, `${testNode.name}\n${testNode.InstanceId}\n${testNode.arn}`)
    })

    it('has no children', async function () {
        const childNodes = await testNode.getChildren()
        assert.ok(childNodes)
        assert.strictEqual(childNodes.length, 0, 'Expected node to have no children')
    })
})
