package com.adds.aiwealthmanager

import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Surface
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.Font
import androidx.compose.ui.text.font.FontFamily
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.adds.aiwealthmanager.ui.theme.DeepGreen
import com.adds.aiwealthmanager.ui.theme.poppinsFontFamily

@Composable
fun IntroPage1() {
    MaterialTheme {
        Surface(
            modifier = Modifier
                .fillMaxSize(),
            color = DeepGreen,
        ) {
            Column(
                verticalArrangement = Arrangement.Center,
                horizontalAlignment = Alignment.CenterHorizontally,
                ) {
                Text(text = "Hi!! I am WealthFolio",
                    color = Color.White,
                    fontWeight = FontWeight.Bold,
                    fontSize = 30.sp,
                    fontFamily = poppinsFontFamily,
                )
            }
        }
    }
}



@Preview
@Composable
fun IntroPage1Demo() {
    IntroPage1()
}