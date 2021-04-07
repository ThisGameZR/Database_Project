import DateTimePicker from 'react-datetime-picker'

import React, { Component } from 'react'

export class DatePicker extends Component {

    constructor(props) {
        super(props)

        this.state = {
            expiretime: null,
        }
    }


    render() {
        return (
            <div>
                <DateTimePicker dayPlaceholder="dd"
                    monthPlaceholder="mm"
                    yearPlaceholder="yyyy"
                    format="dd/MM/y h:mm:ss a"
                    disableClock={true}
                    onChange={(e) => {
                        this.setState({ expiretime: e })
                        this.props.onChangeValue(e)
                    }
                    }
                    value={this.state.expiretime}
                ></DateTimePicker>
            </div>
        )
    }
}

export default DatePicker