import { useSelector, useDispatch } from 'react-redux'
import { increment, decrement, incrementByAmount, reset, selectCount } from '../redux/counterSlice'
import { Button, Typography } from '@mui/material'
import { styled } from "@mui/material/styles"

export default function Counter() {
    //dif way to get count from counter reducer 
    //const count = useSelector((state) => state.counter.count)

    const MyCustomButtom = styled(Button)({
      padding: 30
    })
    const MyCustomButtom2 = styled(Button)(({theme}) => ({
      padding: theme.spacing(5)
    }))
    // const count = useSelector(state => state.counter.count) 
    const count = useSelector(selectCount)

    const dispatch = useDispatch()

    return (
    <div className='counter'>
        <Typography sx={{color:'myCustomColor.main'}} variant='myVariant'>The count is: {count}</Typography>
        <MyCustomButtom2 variant='contained' color='primary' onClick={() => dispatch(increment()) }>increment</MyCustomButtom2>
        <MyCustomButtom variant='contained' color='secondary' onClick={() => dispatch(decrement()) }>decrement</MyCustomButtom>
        <Button sx={{ p:2}} variant='contained' color='primary' onClick={() => dispatch(incrementByAmount(100)) }>increment by 100</Button>
        <Button variant='contained' color='secondary' onClick={() => dispatch(reset())}>reset</Button>
    </div>
  )
}
