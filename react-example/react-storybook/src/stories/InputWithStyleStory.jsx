import React from 'react';
import { storiesOf } from '@storybook/react';

import Input from '../components/InputWithStyle';

storiesOf('InputWithStyle', module)
    .addWithJSX('기본 설정', () => <Input name="name"/>)
    .addWithJSX('label 예제', () => <Input name="name" label="이름"/>)
    .addWithJSX('value 예제', () => <Input name="name" label="이름" value="yoon"/>)
    .addWithJSX('errorMessage 예제', () => <Input name="name" label="이름" errorMessage="이름을 입력해주세요"/>);