export interface StripeProduct {
  id: string;
  priceId: string;
  name: string;
  description: string;
  mode: 'payment' | 'subscription';
  price: string;
  features: string[];
}

export const stripeProducts: StripeProduct[] = [
  {
    id: 'prod_SaH4BJ2jM1J8Pu',
    priceId: 'price_1Rf6WQE2JA8BHiDgyXJmDFyh',
    name: 'Starter',
    description: 'Perfect for small businesses and startups looking to establish their online presence',
    mode: 'payment',
    price: 'TTD 1,497',
    features: [
      '5-page responsive website',
      'Mobile-first design',
      'Basic SEO optimization',
      'Contact form integration',
      'Social media integration',
      '2 rounds of revisions',
      '30-day support'
    ]
  },
  {
    id: 'prod_Sa0Ab3GrlmNWxi',
    priceId: 'price_1ReqAIE2JA8BHiDgfDTR30aR',
    name: 'Professional',
    description: 'Ideal for growing businesses that need advanced features and functionality',
    mode: 'payment',
    price: 'TTD 2,497',
    features: [
      '10-page responsive website',
      'Custom design & branding',
      'Advanced SEO optimization',
      'E-commerce functionality',
      'CMS integration',
      'Analytics setup',
      'Payment gateway integration',
      '5 rounds of revisions',
      '90-day support'
    ]
  },
  {
    id: 'prod_SZyfdwOKNhohga',
    priceId: 'price_1ReohkE2JA8BHiDg8XmR7rgz',
    name: 'Enterprise',
    description: 'For large businesses with complex needs and custom requirements',
    mode: 'payment',
    price: 'TTD 4,497',
    features: [
      'Unlimited pages',
      'Custom web application',
      'Advanced integrations',
      'Multi-language support',
      'Performance optimization',
      'Security hardening',
      'Custom API development',
      'Database design & optimization',
      'Unlimited revisions',
      '1-year support & maintenance'
    ]
  }
];

export const getProductByPriceId = (priceId: string): StripeProduct | undefined => {
  return stripeProducts.find(product => product.priceId === priceId);
};