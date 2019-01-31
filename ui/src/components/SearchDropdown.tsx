import * as React from 'react'

export interface SearchBoxProps {
    title: string,
    onChange: (option: any) => void,
    options: any,
    placeholder: string,
    style?: any
}

export interface SearchBoxState {
    enabled: boolean,
    criteria: string,
}

export class SearchDropdown extends React.Component<SearchBoxProps, SearchBoxState> {
    constructor(props: any, context: any) {
        super(props, context)
        this.state = {
            enabled: true,
            criteria: '',
        }
    }

    onChange = (event: any) => {
        this.props.onChange(event.target.value)
        this.setState({
            criteria: event.target.value
        })
    }

    renderOptions = () => {
        let options = []
        for (let o in this.props.options) {
            options.push(<option value={o} key={o}>{o}</option>)
        }
        return options
    }


    render() {
        const defaultValue = `Select a ${this.props.placeholder}`
        return (
            <div>
                <div>
                    <label>
                        {this.props.title}
                    </label>
                </div>
                <div>
                    <select onChange={(event) => this.props.onChange(event.target.value)} defaultValue={defaultValue}>
                        <option value={defaultValue}>{defaultValue}</option>
                        {this.renderOptions()}
                    </select>
                </div>
            </div>
        )
    }
}
