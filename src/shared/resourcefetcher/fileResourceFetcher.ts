/*!
 * Copyright 2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */

import * as fs from 'fs-extra'
import { getLogger, Logger } from '../logger'
import { ResourceFetcher } from './resourcefetcher'

export class FileResourceFetcher implements ResourceFetcher {
    private readonly logger: Logger = getLogger()

    public constructor(private readonly filepath: string) {}

    /**
     * Returns the contents of the resource, or undefined if the resource could not be retrieved.
     */
    public async get(): Promise<string | undefined> {
        try {
            this.logger.verbose('loading file resource: "%s"', this.filepath)
            return (await fs.readFile(this.filepath)).toString()
        } catch (err) {
            this.logger.verbose('failed to load file resource: "%s": %s', this.filepath, (err as Error).message)
            return undefined
        }
    }
}
