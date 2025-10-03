import React from 'react';
import { Section, SectionColor } from '@site/src/pages/_components/section';
import { SectionHeading } from '@site/src/pages/_components/section-heading';
import { SectionTag } from '@site/src/pages/_components/section-tag';
import styles from './get-started.module.css';
import { Grid, GridItem } from '@site/src/pages/_components/grid';
import { SectionContent } from '@site/src/pages/_components/section-content';

type Props = {
  color?: SectionColor;
  tag?: React.ReactNode;
  /** markdown-ish: _x_ for underline *x* for sparkles */
  heading?: string;
};

function GetStarted({
  color = 'yellow',
  tag = 'Get Started',
  heading = 'Start using _Sentinel_ *Firewall*',
}: Props) {
  return (
    <Section color={color}>
      <SectionContent>
        <SectionTag>{tag}</SectionTag>
        <SectionHeading className={styles.heading}>{heading}</SectionHeading>
      </SectionContent>
      <SectionContent>
        <Grid className={styles.content} alignLast>
          <GridItem>
            <img src="/pages/home/icon/build.svg" alt="" />
            <h4>Install Sentinel</h4>
            <p>Download and install Sentinel Firewall on your Linux server</p>
            <a href="/docs/installation" className="button">
              Download Sentinel
            </a>
          </GridItem>
          <GridItem>
            <img src="/pages/home/icon/compose.svg" alt="" />
            <h4>Upgrade from CSFt</h4>
            <p>Upgrade from CSF to Sentinel on your existing server with ConfigServer Firewall</p>
            <a
              href="docs/upgrade-from-csf/"
              className="button"
            >
              Upgrade from CSF
            </a>
          </GridItem>
          <GridItem>
            <img src="/pages/home/icon/run.svg" alt="" />
            <h4>Visit Docs</h4>
            <p>Read the documentation to get familiar with csf and lfd</p>
            <a href="/docs/intro/" className="button">
              Read Documentation
            </a>
          </GridItem>
        </Grid>
      </SectionContent>
    </Section>
  );
}

export { GetStarted };
