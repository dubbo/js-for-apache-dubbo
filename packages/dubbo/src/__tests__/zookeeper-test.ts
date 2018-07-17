/*
 * Licensed to the Apache Software Foundation (ASF) under one or more
 * contributor license agreements.  See the NOTICE file distributed with
 * this work for additional information regarding copyright ownership.
 * The ASF licenses this file to You under the Apache License, Version 2.0
 * (the "License"); you may not use this file except in compliance with
 * the License.  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import {ZkClient} from '../zookeeper';

describe('zookeeper test suite', () => {
  it('test connect', async () => {
    const client = ZkClient.from({
      application: {
        name: 'node-zookeeper-test',
      },
      register: 'localhost:2181',
      interfaces: [
        'com.alibaba.dubbo.demo.DemoProvider',
        'com.alibaba.dubbo.demo.BasicTypeProvider',
        'com.alibaba.dubbo.demo.ErrorProvider',
      ],
    });

    await (client as any)._connect();

    client.subscribe({
      onData(data) {
        expect(data.size).toEqual(1);
      },
      onError(err) {
        expect(err).toBeNull();
      },
    });
  });
});