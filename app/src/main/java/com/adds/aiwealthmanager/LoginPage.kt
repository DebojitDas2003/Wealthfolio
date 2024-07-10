package com.adds.aiwealthmanager


import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Surface
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.tooling.preview.Preview
import com.adds.aiwealthmanager.ui.theme.DeepGreen

@Composable
fun LoginPage() {
    MaterialTheme{
        Surface(color = DeepGreen,
            modifier = Modifier.fillMaxSize()) {

        }
    }
}



@Preview
@Composable
fun LoginPageDemo() {
    LoginPage()
}