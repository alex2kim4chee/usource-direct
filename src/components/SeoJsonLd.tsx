import React from 'react';
import { DOMAIN_NAME, EMAIL_ADDRESS, FAQ_ITEMS } from '../data/landingData';

const SITE_URL = `https://${DOMAIN_NAME}/`;
const IMAGE_URL = `${SITE_URL}og-image.png`;
const DESCRIPTION =
  'USource Direct помогает российским селлерам и нишевым e-commerce каналам проверять товары из США, выкупать их под реальные заказы и доставлять напрямую клиентам без закупки партий.';

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': `${SITE_URL}#organization`,
      name: 'USource Direct',
      url: SITE_URL,
      email: EMAIL_ADDRESS,
      image: IMAGE_URL,
      contactPoint: {
        '@type': 'ContactPoint',
        email: EMAIL_ADDRESS,
        contactType: 'B2B partnership',
        availableLanguage: ['ru', 'en'],
      },
      knowsAbout: [
        'B2B sourcing',
        'US product procurement',
        'cross-border ecommerce',
        'marketplace sellers',
        'direct-to-consumer logistics',
      ],
    },
    {
      '@type': 'WebSite',
      '@id': `${SITE_URL}#website`,
      url: SITE_URL,
      name: 'USource Direct',
      description: DESCRIPTION,
      inLanguage: 'ru-RU',
      publisher: {
        '@id': `${SITE_URL}#organization`,
      },
    },
    {
      '@type': 'ImageObject',
      '@id': `${SITE_URL}#primaryimage`,
      url: IMAGE_URL,
      contentUrl: IMAGE_URL,
      width: 1920,
      height: 871,
      caption: 'USource Direct: товары из США под заказ без закупки партий',
    },
    {
      '@type': 'WebPage',
      '@id': `${SITE_URL}#webpage`,
      url: SITE_URL,
      name: 'USource Direct — товары из США под заказ без закупки партий',
      description: DESCRIPTION,
      inLanguage: 'ru-RU',
      isPartOf: {
        '@id': `${SITE_URL}#website`,
      },
      about: {
        '@id': `${SITE_URL}#service`,
      },
      primaryImageOfPage: {
        '@id': `${SITE_URL}#primaryimage`,
      },
    },
    {
      '@type': 'Service',
      '@id': `${SITE_URL}#service`,
      name: 'USource Direct B2B sourcing infrastructure',
      serviceType: 'B2B sourcing, product verification, purchase coordination and direct delivery from the United States',
      description: DESCRIPTION,
      provider: {
        '@id': `${SITE_URL}#organization`,
      },
      areaServed: [
        {
          '@type': 'Country',
          name: 'Russia',
        },
        {
          '@type': 'Country',
          name: 'United States',
        },
      ],
      audience: {
        '@type': 'BusinessAudience',
        audienceType: 'Marketplace sellers, niche online stores, Telegram commerce channels and entrepreneurs with an owned audience',
      },
    },
    {
      '@type': 'FAQPage',
      '@id': `${SITE_URL}#faq`,
      mainEntity: FAQ_ITEMS.map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.answer,
        },
      })),
    },
  ],
};

export const SeoJsonLd: React.FC = () => (
  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
  />
);
