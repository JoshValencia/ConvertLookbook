# Shopify Lookbook Feature

A Lookbook feature built natively on Shopify using metaobjects, Liquid sections, and the theme customizer — no third-party apps required.

---

## Overview

This implementation allows a fashion store to create and manage editorial Lookbooks that:

- Can be added to **any page** via the theme customizer as a standalone section
- **Automatically appear on product pages** when that product is part of a Lookbook
- Are fully managed through the **Shopify admin** using metaobjects

---

## Metaobject Schema

The Lookbook metaobject is defined with the following fields:

| Field | Type | Description |
|---|---|---|
| `title` | Single-line text | Display name of the Lookbook |
| `description` | Multi-line text | Short editorial description |
| `products` | List of product references | Products featured in this Lookbook |

### Creating a Lookbook Entry

1. Go to **Content → Metaobjects** in the Shopify Admin
2. Select the **Lookbook** definition
3. Click **Add entry**
4. Fill in the title, description, and select the products to feature
5. Save

---

## Theme Files

```
sections/
  lookbook.liquid           # Standalone Lookbook section for the theme customizer

snippets/
  lookbook-product-card.liquid   # Product card used inside the Lookbook carousel
```
assets/
  custom.js   # Splide Configuration
```
assets/
  custom.css   # Lookbook section's CSS styling
```

---

## Lookbook Section (`sections/lookbook.liquid`)

### How It Works

The section renders a Lookbook selected via the theme customizer. It supports two contexts:

**On any page (homepage, landing pages, etc.)**
The Lookbook renders unconditionally as long as a metaobject entry is selected in the settings.

**On a product page**
The section checks whether the current product exists in the selected Lookbook's product list. It only renders if the product is found — otherwise the section is hidden entirely.

### Product Page Matching Logic

```liquid
{% liquid
  assign display_lookbook = true

  if section.settings.lookbook == blank
    assign display_lookbook = false
  endif

  if product != blank
    assign is_matched = false
    for p in section.settings.lookbook.products.value
      if p.id == product.id
        assign is_matched = true
      endif
    endfor
    unless is_matched
      assign display_lookbook = false
    endunless
  endif
%}
```

### Schema Settings

The section exposes the following settings in the theme customizer:

| Setting | Type | Description |
|---|---|---|
| `lookbook` | Metaobject | Select which Lookbook to display |
| `heading_line_1` | Text | First line of the section heading |
| `heading_line_2` | Text | Second line of the section heading |
| `series_label` | Text | Series label displayed below the Lookbook title |
| `scroll_label` | Text | CTA text shown on the slider controller |

---

## Adding the Lookbook to a Page

### Via the Theme Customizer

1. Go to **Online Store → Themes → Customize**
2. Navigate to the page you want to add the Lookbook to
3. Click **Add section** and select **Lookbook**
4. In the section settings, select a Lookbook metaobject entry from the dropdown
5. Optionally customize the heading, series label, and scroll CTA text
6. Save

### On the Product Page

1. In the theme customizer, navigate to the **Product** template
2. Add the **Lookbook** section to the product page layout
3. Select a Lookbook from the section settings
4. The section will automatically show or hide based on whether the viewed product is included in the selected Lookbook

---

## Carousel

The product carousel is powered by [Splide.js](https://splidejs.com/), a lightweight vanilla JS slider. It is initialised via a custom script and includes custom components:

- Prev/next arrow controls
- A progress bar indicator
- A "SCROLL TO DISCOVER" CTA label (customizable via section settings)

---

## Requirements

- Shopify Online Store 2.0 theme (e.g. Dawn)
- Splide.js loaded in the theme (via CDN or bundled asset)