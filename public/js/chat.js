const socket = io()

socket.on('countUpdated', (count) => {
    console.log('Counter updated ', count)
})

document.querySelector('#increment').addEventListener('click', () => {
    console.log('trigger click')
    socket.emit('increment')
})
