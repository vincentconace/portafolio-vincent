'use client';

import { styled } from 'styled-components';

const containerValue = ({ theme }) => theme?.breakpoints?.container;

export const Container = styled.div`
  padding-inline: clamp(1.25rem, 5vw, 4rem);
  margin-inline: auto;

  @media screen and (min-width: ${({ theme }) => theme?.breakpoints?.md}) {
    padding-inline: calc(clamp(2.5em, 8vw, 8em) * 2);
  }

  @media screen and (min-width: ${containerValue}) {
    max-width: ${containerValue};
  }
`;

export const Row = styled.div`
  --default-padding: clamp(5em, 21vh, 12em);

  &:nth-child(1) {
    padding-block-end: calc(var(--default-padding) / 2);
  }

  &:nth-child(2) {
    padding-block-end: calc(var(--default-padding) * 0.5);
  }
`;

export const ImageWrapper = styled.div`
  --image-size: clamp(4.5em, 6.5vw, 8em);

  position: relative;
  width: var(--image-size);
  height: var(--image-size);
`;

export const MainTitle = styled.h2`
  font-size: clamp(2.5rem, 12vw, 7rem);
  line-height: 1.05;

  @media screen and (min-width: ${({ theme }) => theme?.breakpoints?.md}) {
    font-size: calc(clamp(3.25em, 7vw, 8em) * 0.875);
    line-height: 1.1;
  }
`;
