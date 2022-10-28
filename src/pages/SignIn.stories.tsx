import { Meta, StoryObj } from '@storybook/react';
import { within, userEvent, waitFor} from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import { rest } from 'msw';
import { SignIn } from './SignIn';

export default {
    title: 'Pages/Sign in',
    component: SignIn,
    args: {},
    argTypes: {},
    parameters: {
        msw: {
            handlers: [ 
                rest.post('sessions', (req, res, ctx) => {
                    return res(ctx.json({
                        message: 'Login efetuado'
                    }))
                })
            ]
        }
    }
} as Meta

export const Default: StoryObj = {
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement)


        userEvent.type(canvas.getByPlaceholderText('Digite seu e-mail'), 'pdr050203@gmail.com')
        userEvent.type(canvas.getByPlaceholderText('*******'), '87654321')

        userEvent.click(canvas.getByRole('button'))

        waitFor(() => {
            expect(canvas.getByText('Login realizado')).toBeInTheDocument()
        })        
    }
}