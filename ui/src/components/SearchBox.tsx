import * as React from 'react'

export interface SearchBoxProps {
    labelText: string,
    onChange: (text: string) => void,
    style?: any
}

export interface SearchBoxState {
    enabled: boolean,
    criteria: string,
}

export class SearchBox extends React.Component<SearchBoxProps, SearchBoxState> {
    constructor(props: any, context: any) {
        super(props, context)
        this.state = {
            enabled: true,
            criteria: '',
        }
    }

    onChange = (value: string) => {
        this.props.onChange(value)
        this.setState({
            criteria: value
        })
    }

    render() {
        return (
            <div style={this.props.style}>
                <div>
                    <label>
                        {this.props.labelText}
                    </label>
                </div>
                <div>
                    <input
                        style={{ width: '100%' }}
                        type="text"
                        value={this.state.criteria}
                        disabled={!this.state.enabled}
                        onChange={event => this.onChange(event.target.value)}
                    />
                </div>
            </div>
        )
    }
}
