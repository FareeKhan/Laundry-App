import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Provider } from 'react-redux'
import { store } from './src/redux/store'
import AppNavigation from './src/navigation/AppNavigation'
const App = () => {

  return (
    <Provider store={store}>
      <AppNavigation />
    </Provider>
  )
}

export default App

const styles = StyleSheet.create({})


