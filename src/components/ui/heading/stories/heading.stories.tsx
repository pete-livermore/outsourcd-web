import type { Meta, StoryObj } from '@storybook/react'

import { Heading } from '../heading'

// More on how to set up stories at: https://storybook.js.org/docs/7.0/react/writing-stories/introduction
const meta: Meta<typeof Heading> = {
  title: 'Components/Heading',
  component: Heading,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Heading>

// More on writing stories with args: https://storybook.js.org/docs/7.0/react/writing-stories/args
export const HeadingLevelOne: Story = {
  args: {
    children: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  },
}

export const HeadingLevelTwo: Story = {
  args: {
    children: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    variant: 'h2',
  },
}

export const HeadingLevelThree: Story = {
  args: {
    children: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    variant: 'h3',
  },
}

export const Centered: Story = {
  args: {
    children: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    justification: 'center',
  },
}
