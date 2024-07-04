package com.adds.aiwealthmanager.ui.theme

import androidx.compose.foundation.Image
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.padding
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import com.adds.aiwealthmanager.R

@Composable
fun Star() {
    Box{
        Column(modifier = Modifier
            .fillMaxSize()) {
            Image(painter = painterResource(id = R.drawable.star), contentDescription = "star", alignment = Alignment.TopStart, modifier = Modifier.padding(50.dp, 100.dp, 0.dp, 0.dp))
            Image(painter = painterResource(id = R.drawable.star), contentDescription = "star", alignment = Alignment.BottomEnd, modifier = Modifier.padding(300.dp, 200.dp, 0.dp, 0.dp))
        }
    }
}


@Preview
@Composable
fun StarDemo() {
    Star()
}