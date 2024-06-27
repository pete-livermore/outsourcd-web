import type { Meta, StoryObj } from '@storybook/react'

import { Heading } from '../heading'

// More on how to set up stories at: https://storybook.js.org/docs/7.0/react/writing-stories/introduction
const meta: Meta<typeof Heading> = {
  title: 'Components/Heading',
  component: Heading,
  tags: ['autodocs'],
  argTypes: {
    textColor: {
      options: ['primary', 'grey', 'white'],
      control: { type: 'select' },
    },
    size: {
      options: ['xxl', 'xl', 'lg', 'md', 'sm'],
      control: { type: 'select' },
    },
    as: {
      options: ['h1', 'h2', 'h3'],
      control: { type: 'select' },
    },
  },
}

export default meta
type Story = StoryObj<typeof Heading>

// More on writing stories with args: https://storybook.js.org/docs/7.0/react/writing-stories/args
export const Default: Story = {
  args: {
    children: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  },
}

export const XXL: Story = {
  args: {
    children: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    size: 'xxl',
  },
}

export const XL: Story = {
  args: {
    children: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    size: 'xl',
  },
}

export const Large: Story = {
  args: {
    children: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    size: 'lg',
  },
}

export const Grey: Story = {
  args: {
    children: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    textColor: 'grey',
  },
}
