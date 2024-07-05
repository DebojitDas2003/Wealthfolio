package com.adds.aiwealthmanager

import androidx.compose.foundation.Image
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Surface
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.text.SpanStyle
import androidx.compose.ui.text.buildAnnotatedString
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.withStyle
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.adds.aiwealthmanager.ui.theme.DeepGreen
import com.adds.aiwealthmanager.ui.theme.Star
import com.adds.aiwealthmanager.ui.theme.Star2
import com.adds.aiwealthmanager.ui.theme.poppinsFontFamily

@Composable
fun IntroPage4() {
    MaterialTheme {
        Surface(modifier = Modifier.fillMaxSize(),
            color = DeepGreen) {

            Star2()


            Column(verticalArrangement = Arrangement.Top,
                horizontalAlignment = Alignment.CenterHorizontally,) {

                Image(
                    painter = painterResource(id = R.drawable.casual_life),
                    contentDescription = "",
                    modifier = Modifier
                        .size(300.dp)
                        .padding(0.dp, 100.dp, 0.dp, 0.dp))





                val intro2 = buildAnnotatedString {
                    withStyle(
                        style = SpanStyle(
                            color = Color.Red,
                            fontFamily = poppinsFontFamily,
                            fontWeight = FontWeight.Bold,
                            fontSize = 34.sp)) {
                        append("   Don't ")
                    }

                    withStyle(
                        style = SpanStyle(
                            color = Color.White,
                            fontFamily = poppinsFontFamily,
                            fontWeight = FontWeight.Bold,
                            fontSize = 34.sp)) {
                        append("be \n \n")

                        withStyle(
                            style = SpanStyle(
                                color = Color.Red,
                                fontFamily = poppinsFontFamily,
                                fontWeight = FontWeight.Bold,
                                fontSize = 34.sp)) {
                            append("stressed!!!")

                            
                        }
                    }
                }


                Text(intro2,
                    modifier = Modifier
                        .padding(0.dp, 100.dp, 0.dp, 0.dp))
            }
        }
    }
}

@Preview
@Composable
fun IntroPage4Demo() {
    IntroPage4()
}