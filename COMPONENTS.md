# 📦 Componentes ROTEC Design System

Documentação dos componentes compartilhados do design system ROTEC.

## Índice

1. [Modal](#modal)
2. [SectionHeader](#sectionheader)
3. [Card](#card)
4. [Button](#button)
5. [LinkIcon](#linkicon)
6. [CloseButton](#closebutton)

---

## Modal

Modal reutilizável com suporte a Escape key, backdrop e overflow management.

### Localização
`src/components/shared/Modal.tsx`

### Props

```typescript
interface ModalProps {
  open: boolean;                    // Controla visibilidade do modal
  onClose: () => void;              // Callback ao fechar
  title?: string;                   // Título opcional no header
  children: ReactNode;              // Conteúdo do modal
  size?: 'sm' | 'md' | 'lg' | 'xl'; // Tamanho (padrão: 'md')
  showCloseButton?: boolean;        // Mostrar botão X (padrão: true)
  closeOnBackdrop?: boolean;        // Fechar ao clicar backdrop (padrão: true)
}
```

### Uso

```tsx
import Modal from '@/components/shared/Modal';
import { useState } from 'react';

export default function MyComponent() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button onClick={() => setOpen(true)}>Abrir Modal</button>

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title="Meu Modal"
        size="md"
      >
        <p>Conteúdo do modal aqui</p>
      </Modal>
    </>
  );
}
```

### Características

- ✅ Escape key fecha automaticamente
- ✅ Clique no backdrop fecha
- ✅ Body overflow gerenciado
- ✅ Acessibilidade (role="dialog", aria-modal)
- ✅ 4 tamanhos predefinidos
- ✅ Responsivo

### Tokens Aplicados

- `--z-modal`: z-index
- `--space-lg`: padding
- `--radius-xl`: border radius
- `--shadow-hover`: sombra

---

## SectionHeader

Header padrão para seções com título e subtítulo.

### Localização
`src/components/shared/SectionHeader.tsx`

### Props

```typescript
interface SectionHeaderProps {
  title: string;                      // Título obrigatório
  subtitle?: string;                  // Subtítulo opcional
  centered?: boolean;                 // Centralizar (padrão: true)
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl'; // Largura máxima (padrão: 'lg')
  className?: string;                 // Classes Tailwind adicionais
  children?: ReactNode;               // Conteúdo adicional
}
```

### Uso

```tsx
import SectionHeader from '@/components/shared/SectionHeader';

export default function MySection() {
  return (
    <section>
      <SectionHeader
        title="Minha Seção"
        subtitle="Descrição da seção"
        maxWidth="lg"
      />
      {/* Conteúdo aqui */}
    </section>
  );
}
```

### Tokens Aplicados

- `--space-md`: margin-top do subtítulo

---

## Card

Card reutilizável com suporte a ícone, título e variantes.

### Localização
`src/components/shared/Card.tsx`

### Props

```typescript
interface CardProps {
  children?: ReactNode;                      // Conteúdo principal
  title?: string;                            // Título opcional
  icon?: ReactNode;                          // Ícone opcional (lucide)
  onClick?: () => void;                      // Click handler
  variant?: 'default' | 'interactive' | 'border'; // Estilo
  className?: string;                        // Classes adicionais
  size?: 'sm' | 'md' | 'lg';                // Tamanho (padrão: 'md')
}
```

### Variantes

#### Default
Card simples com sombra suave.

```tsx
<Card title="Título">
  Conteúdo aqui
</Card>
```

#### Interactive
Card com hover e cursor pointer.

```tsx
<Card
  title="Clique para ação"
  variant="interactive"
  onClick={() => console.log('Clicado!')}
>
  Conteúdo interativo
</Card>
```

#### Border
Card com border mais espesso.

```tsx
<Card variant="border" title="Com Border">
  Conteúdo
</Card>
```

### Tokens Aplicados

- `--space-md`: padding e margin-bottom do ícone
- `--space-sm`: margin-bottom do título
- `--radius-xl`: border radius
- `--shadow-soft`: sombra padrão

---

## Button

Botão com múltiplas variantes e tamanhos.

### Localização
`src/components/shared/Button.tsx`

### Props

```typescript
interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;                          // Texto do botão
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'; // Estilo
  size?: 'sm' | 'md' | 'lg';                   // Tamanho (padrão: 'md')
  icon?: ReactNode;                             // Ícone opcional (lucide)
  loading?: boolean;                            // Estado loading
  asLink?: boolean;                             // Renderizar como <a>
  href?: string;                                // URL (se asLink)
}
```

### Variantes

#### Primary
Botão principal, com fundo sólido.

```tsx
<Button>Clique aqui</Button>
```

#### Secondary
Botão secundário, com border.

```tsx
<Button variant="secondary">Secundário</Button>
```

#### Outline
Botão com apenas border.

```tsx
<Button variant="outline">Outline</Button>
```

#### Ghost
Botão transparente.

```tsx
<Button variant="ghost">Ghost</Button>
```

### Tamanhos

```tsx
<Button size="sm">Pequeno</Button>
<Button size="md">Médio</Button>
<Button size="lg">Grande</Button>
```

### Com Ícone

```tsx
import { Heart } from 'lucide-react';

<Button icon={<Heart size={20} />}>
  Favoritar
</Button>
```

### Como Link

```tsx
<Button asLink href="/about">
  Ir para Sobre
</Button>
```

### Estado Loading

```tsx
<Button loading>Carregando...</Button>
```

### Tokens Aplicados

- `--space-sm`, `--space-md`, `--space-lg`: padding dinâmico
- `--radius-xl`: border radius

---

## LinkIcon

Link com ícone (lucide ou imagem).

### Localização
`src/components/shared/LinkIcon.tsx`

### Props

```typescript
interface LinkIconProps {
  href: string;                     // URL do link
  icon?: ReactNode;                 // Ícone lucide-react
  iconSrc?: string;                 // Src de imagem
  label: string;                    // Texto do link
  title?: string;                   // Tooltip (padrão: label)
  className?: string;               // Classes adicionais
}
```

### Uso

#### Com Ícone Lucide

```tsx
import { Mail } from 'lucide-react';
import LinkIcon from '@/components/shared/LinkIcon';

<LinkIcon
  href="mailto:contato@rotec.com"
  icon={<Mail size={20} />}
  label="Email"
/>
```

#### Com Imagem

```tsx
<LinkIcon
  href="https://instagram.com"
  iconSrc="/images/instagram.svg"
  label="Instagram"
/>
```

---

## CloseButton

Botão fechar padrão para modais e similar.

### Localização
`src/components/shared/CloseButton.tsx`

### Props

```typescript
interface CloseButtonProps {
  onClick: () => void;    // Callback ao clicar
  label?: string;         // aria-label (padrão: 'Fechar')
  className?: string;     // Classes adicionais
}
```

### Uso

```tsx
import CloseButton from '@/components/shared/CloseButton';

<CloseButton onClick={() => setOpen(false)} />
```

---

## Design Tokens Aplicados

### Cores

```
--color-primary:       #110c6c (Roxo escuro)
--color-secondary:     #f8f8ff (Branco/Lavanda)
--color-complementary: #191919 (Cinza escuro)
--color-accent:        #00a99d (Teal)
--color-success:       #16a34a (Verde)
```

### Espaçamento

```
--space-sm: 0.5rem (8px)
--space-md: 1rem   (16px) - Padrão
--space-lg: 1.5rem (24px)
```

### Z-Index

```
--z-header:  40   (Header sticky)
--z-modal:   80   (Modais)
--z-overlay: 100  (Overlays/Menus)
```

### Raios

```
--radius-lg: 0.75rem (12px)
--radius-xl: 1rem    (16px) - Padrão
```

### Sombras

```
--shadow-soft:  0 1px 2px rgba(0, 0, 0, 0.06)
--shadow-hover: 0 6px 24px rgba(0, 0, 0, 0.08)
```

### Animações

```
fadeInSmooth: Fade + translateY (0.25s ou 0.4s)
marquee:      Scroll infinito (40s)
```

---

## Boas Práticas

1. **Preferir componentes compartilhados** - Use componentes `shared/` ao invés de criar novos
2. **Usar tokens de design** - Aplique `--space-*`, `--color-*`, etc.
3. **Manter acessibilidade** - Role, aria-label, keyboard support
4. **Manter responsividade** - Testar em mobile, tablet, desktop
5. **Documentar customizações** - Se criar variante nova, documente aqui

---

## Versionamento

- **v2.0** - Design system completo com tokens e componentes compartilhados
- **Data** - 03/11/2025
- **Status** - ✅ Production Ready

---

**Perguntas ou sugestões?** Consulte `DESIGN_TOKENS_MAP.md` ou abra issue no repositório.
