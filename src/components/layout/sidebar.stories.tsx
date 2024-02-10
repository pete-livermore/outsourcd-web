import { Meta, StoryObj } from '@storybook/react'

import { Sidebar } from '.'

const mockNavItems = [{ name: 'Home' }]

const meta = {
  title: 'navigation/Sidebar',
  component: Sidebar,
  decorators: (Story) => (
    <div className='flex h-screen'>
      <Story />
    </div>
  ),
} satisfies Meta<typeof Sidebar>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: (
      <ul>
        {mockNavItems.map((item, i) => (
          <li className='text-white' key={i}>
            {item.name}
          </li>
        ))}
      </ul>
    ),
  },
}
