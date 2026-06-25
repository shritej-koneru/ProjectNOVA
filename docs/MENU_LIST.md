# Pricing Reference

## Data Source
`src/data/menu.ts` — pricing records used by the pricing section and service detail pages.

```
Quick Services              ₹99–₹199
Cleanup & Debloating        ₹199–₹599
Performance Boost           ₹299–₹799
Desktop Customization       ₹199–₹699
Windows & Software          ₹99–₹799
Productivity                ₹199–₹599
Developer                   ₹299–₹999
Linux                       ₹299–₹799
Gaming                      ₹99–₹799
Troubleshooting             ₹199–₹499+
Bundles                     ₹399–₹1299
Custom Services             ₹99–₹1499+
```

## Pricing Pages
- **Service detail** (`/services/[slug]`): shows price badge from menu data
- **Services page** (`/services`): shows price in card
- **Pricing section** (`src/sections/pricing.tsx`): full pricing table (used on home page, optional)
