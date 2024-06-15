import type { Meta, StoryObj } from '@storybook/react'

import { Button } from '.'

const meta = {
  title: 'ui/button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {
  args: {
    variant: 'default',
    children: 'Default',
  },
}

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Default',
  },
}

export const Destructive: Story = {
  args: {
    variant: 'destructive',
    children: 'Default',
  },
}

export const Outline: Story = {
  args: {
    variant: 'outline',
    children: 'Default',
  },
}

export const Ghost: Story = {
  args: {
    variant: 'ghost',
    children: 'Default',
  },
}

export const Link: Story = {
  args: {
    variant: 'link',
    children: 'Default',
  },
}
