import React from 'react';
import * as Styled from './link.styled';
import { LinkType } from '../../types/student.types';

const Link = ({ title, to }: LinkType) => <Styled.DomLink to={to}>{title}</Styled.DomLink>;

export default Link;
