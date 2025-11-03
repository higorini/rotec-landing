# 🎨 Design Tokens - ROTEC

Documentação completa dos tokens de design do sistema ROTEC.

## Índice

1. [Cores](#cores)
2. [Tipografia](#tipografia)
3. [Espaçamento](#espaçamento)
4. [Raios](#raios)
5. [Sombras](#sombras)
6. [Z-Index](#z-index)
7. [Animações](#animações)

---

## Cores

### Cores Primárias

Usadas para identidade visual principal da marca.

| Token | Valor | Hex | Uso |
|---|---|---|---|
| `--color-primary` | Roxo escuro | #110c6c | Backgrounds, headers, text principal |
| `--color-secondary` | Branco/Lavanda | #f8f8ff | Cards, containers, backgrounds claros |
| `--color-complementary` | Cinza escuro | #191919 | Texto corpo, elemento neutro |

### Cores Secundárias

Usadas para destaques e estados específicos.

| Token | Valor | Hex | Uso |
|---|---|---|---|
| `--color-accent` | Teal | #00a99d | Destaques, CTAs secundárias |
| `--color-success` | Verde | #16a34a | WhatsApp, ações positivas |

### Paleta de Cinzas

Para textos secundários, borders e backgrounds neutros.

| Token | Valor | Hex | Uso |
|---|---|---|---|
| `--color-gray-100` | Muito claro | #f3f4f6 | Backgrounds leves |
| `--color-gray-200` | Claro | #e5e7eb | Borders, dividers |
| `--color-gray-600` | Médio | #4b5563 | Texto secundário |

### Uso em CSS

```css
/* Em globals.css */
@theme {
  --color-primary: #110c6c;
  --color-secondary: #f8f8ff;
  --color-complementary: #191919;
  --color-accent: #00a99d;
  --color-success: #16a34a;
  --color-gray-100: #f3f4f6;
  --color-gray-200: #e5e7eb;
  --color-gray-600: #4b5563;
}
```

### Uso em Componentes

```tsx
/* Em componentes React/Next */

// Via className
<div className="bg-[var(--color-primary)]">
  Fundo roxo
</div>

// Via style
<div style={{ color: 'var(--color-accent)' }}>
  Texto teal
</div>
```

---

## Tipografia

### Famílias de Fonte

Carregadas via Google Fonts com fallbacks.

| Token | Fonte | Pesos | Uso |
|---|---|---|---|
| `--font-display` | Bebas Neue | 400 | H1, títulos grandes |
| `--font-title` | Karantina | 300, 400, 700 | H2, H3, headers |
| `--font-body` | Alexandria | 400, 600, 700 | Texto corpo padrão |

### Tamanhos Recomendados (Tailwind)

```
text-xs:  12px   (Labels, captions)
text-sm:  14px   (Small text)
text-base: 16px  (Padrão)
text-lg:  18px   (Texto maior)
text-xl:  20px   (Subtítulos)
text-2xl: 24px   (H3)
text-3xl: 30px   (H2 mobile)
text-4xl: 36px   (H2 tablet)
text-5xl: 48px   (H1 mobile)
text-6xl: 60px   (H1 tablet)
text-7xl: 72px   (H1 desktop)
```

### Uso

```tsx
<h1 className="font-display text-5xl sm:text-6xl lg:text-7xl">
  Título Grande
</h1>

<h2 className="font-title text-3xl sm:text-4xl">
  Subtítulo
</h2>

<p className="font-body text-base">
  Parágrafo padrão
</p>
```

---

## Espaçamento

Escala de espaçamento consistente usada em padding, margin e gaps.

### Scale

```css
--space-sm: 0.5rem   (8px)
--space-md: 1rem     (16px) - PADRÃO
--space-lg: 1.5rem   (24px)

--gap-card: 1rem     (16px)
--gap-section: 1.5rem (24px)
```

### Uso em Componentes

```tsx
// Padding
<div style={{ padding: 'var(--space-md)' }}>
  Padding padrão
</div>

// Padding horizontal/vertical
<div style={{
  paddingX: 'var(--space-md)',
  paddingY: 'var(--space-lg)'
}}>
  Padding customizado
</div>

// Margin
<div style={{ marginTop: 'var(--space-md)' }}>
  Com espaço acima
</div>

// Gap em grid/flex
<div className="flex gap-[var(--gap-card)]">
  Itens com espaço
</div>
```

### Padrões de Composição

```tsx
/* Botão - Pequeno */
padding: var(--space-sm) var(--space-md)

/* Botão - Médio (PADRÃO) */
padding: var(--space-md) var(--space-lg)

/* Botão - Grande */
padding: calc(var(--space-md) + 0.25rem) calc(var(--space-lg) + 0.5rem)

/* Card */
padding: var(--space-md)

/* Modal */
padding: var(--space-lg)
```

---

## Raios

Border radius para elementos arredondados.

| Token | Valor | Uso |
|---|---|---|
| `--radius-lg` | 0.75rem (12px) | Alguns elementos |
| `--radius-xl` | 1rem (16px) | **PADRÃO** - Buttons, cards, modais |

### Uso

```tsx
<div className="rounded-[var(--radius-xl)]">
  Elemento arredondado padrão
</div>

<button className="rounded-[var(--radius-lg)]">
  Botão pequeno
</button>
```

---

## Sombras

Efeitos de sombra para profundidade.

| Token | Valor | Uso |
|---|---|---|
| `--shadow-soft` | `0 1px 2px rgba(0,0,0,0.06)` | Cards, elementos leves |
| `--shadow-hover` | `0 6px 24px rgba(0,0,0,0.08)` | Hover states, destaque |

### Uso

```tsx
<div className="shadow-[var(--shadow-soft)]">
  Card com sombra suave
</div>

<div className="shadow-[var(--shadow-hover)]">
  Elemento com sombra acentuada (hover)
</div>
```

---

## Z-Index

Escala de profundidade para elementos sobrepostos.

| Token | Valor | Componente | Uso |
|---|---|---|---|
| `--z-header` | 40 | Header.tsx | Header sticky |
| `--z-modal` | 80 | Modal.tsx, Lightbox.tsx | Modais e lightbox |
| `--z-overlay` | 100 | Header.tsx mobile | Menu mobile, overlays |

### Uso

```tsx
/* Header sticky */
<header style={{ zIndex: 'var(--z-header)' }}>
  Navigation
</header>

/* Modal */
<div style={{ zIndex: 'var(--z-modal)' }}>
  Conteúdo modal
</div>

/* Overlay */
<div style={{ zIndex: 'var(--z-overlay)' }}>
  Menu mobile
</div>
```

### Hierarquia

```
100 (--z-overlay) ↑  Overlays, menus mobile
 80 (--z-modal)       Modais
 40 (--z-header)      Header sticky
  0 (padrão)      ↓  Conteúdo normal
```

---

## Animações

Animações reusáveis definidas em `globals.css`.

### fadeInSmooth

Fade in com translateY suave.

```css
@keyframes fadeInSmooth {
  from {
    opacity: 0;
    transform: translateY(4px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.fade-in { animation: fadeInSmooth 0.25s ease; }
.animate-fadeIn { animation: fadeInSmooth 0.4s ease-in-out; }
```

### marquee

Scroll infinito horizontal.

```css
@keyframes marquee {
  from { transform: translateX(0); }
  to { transform: translateX(-100%); }
}

.marquee-track { animation: marquee 40s linear infinite; }
```

### Uso

```tsx
<div className="fade-in">
  Elemento com fade in
</div>

<div className="marquee-track">
  Conteúdo scrolling
</div>
```

---

## Exemplo Completo - Componente

```tsx
import { useState } from 'react';

export default function Example() {
  const [open, setOpen] = useState(false);

  return (
    <section
      className="full-bleed bg-padrao"
      style={{ paddingTop: 'var(--space-lg)' }}
    >
      <div className="container mx-auto">
        {/* Header */}
        <header
          className="rounded-[var(--radius-xl)]"
          style={{
            backgroundColor: 'var(--color-secondary)',
            padding: 'var(--space-lg)',
            boxShadow: 'var(--shadow-soft)',
          }}
        >
          <h1 className="font-display text-4xl text-[var(--color-primary)]">
            Título
          </h1>
          <p
            className="text-sm text-[var(--color-gray-600)]"
            style={{ marginTop: 'var(--space-md)' }}
          >
            Descrição
          </p>
        </header>

        {/* Cards */}
        <div className="flex flex-col gap-[var(--gap-card)] mt-6">
          <div
            className="p-4 rounded-[var(--radius-xl)] shadow-[var(--shadow-soft)]"
            style={{ backgroundColor: 'var(--color-secondary)' }}
          >
            Card 1
          </div>
          <div
            className="p-4 rounded-[var(--radius-xl)]"
            style={{
              backgroundColor: 'var(--color-accent)',
              boxShadow: 'var(--shadow-hover)',
            }}
          >
            Card 2 (Destaque)
          </div>
        </div>
      </div>
    </section>
  );
}
```

---

## Migração de Valores Hardcoded

### Antes
```tsx
<div className="bg-purple-900 p-4 rounded-2xl shadow-lg">
  Conteúdo
</div>
```

### Depois
```tsx
<div
  className="rounded-[var(--radius-xl)]"
  style={{
    backgroundColor: 'var(--color-primary)',
    padding: 'var(--space-md)',
    boxShadow: 'var(--shadow-hover)',
  }}
>
  Conteúdo
</div>
```

---

## Performance

### CSS Variables são Eficientes

- ✅ Sem cálculos em runtime
- ✅ Native browser support (IE 11+)
- ✅ Pequeno impact na performance
- ✅ Compiladas pelo PostCSS

### Recomendações

1. **Preferir className para valores fixos** - Melhor para Tailwind
2. **Usar style para valores dinâmicos** - Melhor com tokens
3. **Manter cache de build** - Next.js otimiza automaticamente
4. **Validar com stylelint** - `npm run lint:css`

---

## Versionamento

| Versão | Data | Mudanças |
|---|---|---|
| 2.0 | 03/11/2025 | Design system completo com tokens |
| 1.0 | Anterior | Estilos hardcoded |

---

## Suporte

- 📄 Documentação: `COMPONENTS.md`
- 🔍 Validação: `npm run lint:css`
- ✅ Build: `npm run build`
- 🚀 Deploy: Production ready
