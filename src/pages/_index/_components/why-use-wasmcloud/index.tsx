import React from 'react';
import { Section } from '@site/src/pages/_components/section';
import { SectionHeading } from '@site/src/pages/_components/section-heading';
import { SectionTag } from '@site/src/pages/_components/section-tag';
import styles from './why-use-wasmcloud.module.css';
import { SectionContent } from '@site/src/pages/_components/section-content';

type Props = {};

function WhyUseWasmCloud({}: Props) {
  return (
    <Section color="space-blue" id="why-use-wasmcloud">
      <SectionContent className={styles.content}>
        <SectionTag>Why use Sentinel?</SectionTag>
        <SectionHeading>
          Security. Control. Automation. Visibility. Reliability. Ease of Management.
        </SectionHeading>
        <p>
          Sentinel firewall (CSF and LFD) offers advanced firewall protection, real-time intrusion detection, and an intuitive web interface—giving administrators powerful tools to safeguard servers while simplifying day-to-day management.
        </p>
      </SectionContent>
      <SectionContent className={styles.image}>
        <img src="/pages/home/why-use-wasmcloud/wasm-everywhere.svg" alt="" />
      </SectionContent>
    </Section>
  );
}

export { WhyUseWasmCloud };
