'use client';

import React from 'react';
import styled from 'styled-components';
import {
    Field,
    SourceLinkElement,
    AppContainerElement,
    AppTitleSection,
    AppTitle,
    AppBody,
    AppContent
} from '../common-elements';

const SourceLink = styled(SourceLinkElement).attrs({
    href: 'https://github.com/global-input/',
    rel: 'noreferrer noopener',
    target: '_blank'
})``;

interface AppContainerProps {
    children: React.ReactNode;
}

export const AppContainer: React.FC<AppContainerProps> = ({ children }) => (
    <AppContainerElement>
        <AppTitleSection>
            <AppTitle>Video Player Control</AppTitle>
        </AppTitleSection>
        <AppBody>
            <AppContent>
                {children}
            </AppContent>
            <SourceLink>Source Code</SourceLink>
        </AppBody>
    </AppContainerElement>
);

export const DomainField = styled(Field)`
    max-width: 300px;
`;