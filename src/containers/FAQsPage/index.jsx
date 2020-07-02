import React, { useContext, useState } from 'react';
import { Layout, Collapse } from 'antd';

import * as DATA from '../HomePage/data';

import * as ROUTES from '../../constants/routes';
import { ThemeContext } from '../../components/ContextProviders/ThemeProvider';
import { Header, Icon } from '../../components';

import './style.scss';

const { Panel } = Collapse;

export default function FAQPage() {
  const theme = useContext(ThemeContext);

  const [FAQs] = useState(DATA.FAQs);

  return (
    <Layout className="faq-page">
      <Header
        bradcrumb
        type="FAQs"
        subHeaderTitle="FAQs"
        headerStyle="faq-page__header"
        layer={false}
        popup
        breadCrumbLink={ROUTES.HOME_PAGE}
      />

      <div className="faq-page__items">
        <Collapse
          defaultActiveKey={['1']}
          expandIcon={({ isActive }) => {
            return (
              <Icon
                id={isActive ? 'arrowUp' : 'arrowDown'}
                iconStyle="faq-page__items-icon__arrow"
                color={theme['primary-color']}
              />
            );
          }}
          expandIconPosition="right"
        >
          {FAQs.map(item => {
            return (
              <Panel
                header={item.question}
                key={item.id}
                className="faq-page__items-item"
                extra={
                  <Icon
                    id="help"
                    iconStyle="faq-page__items-icon"
                    color={theme['primary-color']}
                  />
                }
              >
                <div>{item.answer}</div>
              </Panel>
            );
          })}
        </Collapse>
      </div>
    </Layout>
  );
}
