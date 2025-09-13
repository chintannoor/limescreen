jQuery(document).ready(function () {
    // Profile Photo Upload js
    // Profile Photo Upload js
    // $(document).on("change", ".uploadProfileInput", function () {
    //     var triggerInput = this;
    //     var currentImg = $(this)
    //         .closest(".pic-holder")
    //         .find(".pic")
    //         .attr("src");
    //     var holder = $(this).closest(".pic-holder");
    //     var wrapper = $(this).closest(".profile-pic-wrapper");
    //     $(wrapper).find('[role="alert"]').remove();
    //     triggerInput.blur();
    //     var files = !!this.files ? this.files : [];
    //     if (!files.length || !window.FileReader) {
    //         return;
    //     }
    //     if (/^image/.test(files[0].type)) {
    //         // only image file
    //         var reader = new FileReader(); // instance of the FileReader
    //         reader.readAsDataURL(files[0]); // read the local file

    //         reader.onloadend = function () {
    //             $(holder).addClass("uploadInProgress");
    //             $(holder).find(".pic").attr("src", this.result);
    //             $(holder).append(
    //                 '<div class="upload-loader"><div class="spinner-border text-primary" role="status"><span class="sr-only">Loading...</span></div></div>'
    //             );

    //             // Dummy timeout; call API or AJAX below
    //             setTimeout(() => {
    //                 $(holder).removeClass("uploadInProgress");
    //                 $(holder).find(".upload-loader").remove();
    //                 // If upload successful
    //                 if (Math.random() < 0.9) {
    //                     $(wrapper).append(
    //                         '<div class="snackbar show" role="alert"><i class="fa fa-check-circle text-success"></i> Profile image updated successfully</div>'
    //                     );

    //                     // Clear input after upload
    //                     $(triggerInput).val("");

    //                     setTimeout(() => {
    //                         $(wrapper).find('[role="alert"]').remove();
    //                     }, 3000);
    //                 } else {
    //                     $(holder).find(".pic").attr("src", currentImg);
    //                     $(wrapper).append(
    //                         '<div class="snackbar show" role="alert"><i class="fa fa-times-circle text-danger"></i> There is an error while uploading! Please try again later.</div>'
    //                     );

    //                     // Clear input after upload
    //                     $(triggerInput).val("");
    //                     setTimeout(() => {
    //                         $(wrapper).find('[role="alert"]').remove();
    //                     }, 3000);
    //                 }
    //             }, 1500);
    //         };
    //     } else {
    //         $(wrapper).append(
    //             '<div class="alert alert-danger d-inline-block p-2 small" role="alert">Please choose the valid image.</div>'
    //         );
    //         setTimeout(() => {
    //             $(wrapper).find('role="alert"').remove();
    //         }, 3000);
    //     }
    // });

    function readURL(input, imgControlName) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();
            reader.onload = function (e) {
                $(imgControlName).attr("src", e.target.result);
            };
            reader.readAsDataURL(input.files[0]);
        }
    }

    // upload your images js start

    $("#imag1").change(function () {
        // add your logic to decide which image control you'll use
        var imgControlName1 = "#ImgPreview1";
        readURL(this, imgControlName1);
        $(".preview1").show();
        $(".preview1").addClass("it");
        $(".btn-rmv1").addClass("rmv");
    });

    $("#imag2").change(function () {
        // add your logic to decide which image control you'll use
        var imgControlName2 = "#ImgPreview2";
        readURL(this, imgControlName2);
        $(".preview2").show();
        $(".preview2").addClass("it");
        $(".btn-rmv2").addClass("rmv");
    });

    $("#imag3").change(function () {
        // add your logic to decide which image control you'll use
        var imgControlName3 = "#ImgPreview3";
        readURL(this, imgControlName3);
        $(".preview3").show();
        $(".preview3").addClass("it");
        $(".btn-rmv3").addClass("rmv");
    });

    $("#imag4").change(function () {
        // add your logic to decide which image control you'll use
        var imgControlName4 = "#ImgPreview4";
        readURL(this, imgControlName4);
        $(".preview4").show();
        $(".preview4").addClass("it");
        $(".btn-rmv4").addClass("rmv");
    });

    $("#imag5").change(function () {
        // add your logic to decide which image control you'll use
        var imgControlName5 = "#ImgPreview5";
        readURL(this, imgControlName5);
        $(".preview5").show();
        $(".preview5").addClass("it");
        $(".btn-rmv5").addClass("rmv");
    });

    $("#imag6").change(function () {
        // add your logic to decide which image control you'll use
        var imgControlName6 = "#ImgPreview6";
        readURL(this, imgControlName6);
        $(".preview6").show();
        $(".preview6").addClass("it");
        $(".btn-rmv6").addClass("rmv");
    });

    $("#imag7").change(function () {
        // add your logic to decide which image control you'll use
        var imgControlName7 = "#ImgPreview7";
        readURL(this, imgControlName7);
        $(".preview7").show();
        $(".preview7").addClass("it");
        $(".btn-rmv7").addClass("rmv");
    });

    $("#imag8").change(function () {
        // add your logic to decide which image control you'll use
        var imgControlName8 = "#ImgPreview8";
        readURL(this, imgControlName8);
        $(".preview8").show();
        $(".preview8").addClass("it");
        $(".btn-rmv8").addClass("rmv");
    });

    $("#imag9").change(function () {
        // add your logic to decide which image control you'll use
        var imgControlName9 = "#ImgPreview9";
        readURL(this, imgControlName9);
        $(".preview9").show();
        $(".preview9").addClass("it");
        $(".btn-rmv9").addClass("rmv");
    });

    $("#imag10").change(function () {
        // add your logic to decide which image control you'll use
        var imgControlName10 = "#ImgPreview10";
        readURL(this, imgControlName10);
        $(".preview10").show();
        $(".preview10").addClass("it");
        $(".btn-rmv10").addClass("rmv");
    });

    $("#removeImage1").click(function (e) {
        e.preventDefault();
        $("#imag1").val("");
        $("#ImgPreview1").attr("src", "");
        $(".preview1").hide();
        $(".preview1").removeClass("it");
        $(".btn-rmv1").removeClass("rmv");
    });

    $("#removeImage2").click(function (e) {
        e.preventDefault();
        $("#imag2").val("");
        $("#ImgPreview2").attr("src", "");
        $(".preview2").hide();
        $(".preview2").removeClass("it");
        $(".btn-rmv2").removeClass("rmv");
    });

    $("#removeImage3").click(function (e) {
        e.preventDefault();
        $("#imag3").val("");
        $("#ImgPreview3").attr("src", "");
        $(".preview3").hide();
        $(".preview3").removeClass("it");
        $(".btn-rmv3").removeClass("rmv");
    });

    $("#removeImage4").click(function (e) {
        e.preventDefault();
        $("#imag4").val("");
        $("#ImgPreview4").attr("src", "");
        $(".preview4").hide();
        $(".preview4").removeClass("it");
        $(".btn-rmv4").removeClass("rmv");
    });

    $("#removeImage5").click(function (e) {
        e.preventDefault();
        $("#imag5").val("");
        $("#ImgPreview5").attr("src", "");
        $(".preview5").hide();
        $(".preview5").removeClass("it");
        $(".btn-rmv5").removeClass("rmv");
    });

    $("#removeImage6").click(function (e) {
        e.preventDefault();
        $("#imag6").val("");
        $("#ImgPreview6").attr("src", "");
        $(".preview6").hide();
        $(".preview6").removeClass("it");
        $(".btn-rmv6").removeClass("rmv");
    });

    $("#removeImage7").click(function (e) {
        e.preventDefault();
        $("#imag7").val("");
        $("#ImgPreview7").attr("src", "");
        $(".preview7").hide();
        $(".preview7").removeClass("it");
        $(".btn-rmv7").removeClass("rmv");
    });

    $("#removeImage8").click(function (e) {
        e.preventDefault();
        $("#imag8").val("");
        $("#ImgPreview8").attr("src", "");
        $(".preview8").hide();
        $(".preview8").removeClass("it");
        $(".btn-rmv8").removeClass("rmv");
    });

    $("#removeImage9").click(function (e) {
        e.preventDefault();
        $("#imag9").val("");
        $("#ImgPreview9").attr("src", "");
        $(".preview9").hide();
        $(".preview9").removeClass("it");
        $(".btn-rmv9").removeClass("rmv");
    });
    
    $("#removeImage10").click(function (e) {
        e.preventDefault();
        $("#imag10").val("");
        $("#ImgPreview10").attr("src", "");
        $(".preview10").hide();
        $(".preview10").removeClass("it");
        $(".btn-rmv10").removeClass("rmv");
    });

    // upload your videos js start

    $("#video1").change(function () {
        // add your logic to decide which videoe control you'll use
        var videoControlName1 = "#VideoPreview1";
        readURL(this, videoControlName1);
        $(".videopreview1").show();
        $(".videopreview1").addClass("it");
        $(".btn-rmv-video1").addClass("rmv");
    });

    $("#video2").change(function () {
        // add your logic to decide which videoe control you'll use
        var videoControlName2 = "#VideoPreview2";
        readURL(this, videoControlName2);
        $(".videopreview2").show();
        $(".videopreview2").addClass("it");
        $(".btn-rmv-video2").addClass("rmv");
    });

    $("#video3").change(function () {
        // add your logic to decide which videoe control you'll use
        var videoControlName3 = "#VideoPreview3";
        readURL(this, videoControlName3);
        $(".videopreview3").show();
        $(".videopreview3").addClass("it");
        $(".btn-rmv-video3").addClass("rmv");
    });

    $("#video4").change(function () {
        // add your logic to decide which videoe control you'll use
        var videoControlName4 = "#VideoPreview4";
        readURL(this, videoControlName4);
        $(".videopreview4").show();
        $(".videopreview4").addClass("it");
        $(".btn-rmv-video4").addClass("rmv");
    });

    $("#video5").change(function () {
        // add your logic to decide which videoe control you'll use
        var videoControlName5 = "#VideoPreview5";
        readURL(this, videoControlName5);
        $(".videopreview5").show();
        $(".videopreview5").addClass("it");
        $(".btn-rmv-video5").addClass("rmv");
    });

    $("#removeVideo1").click(function (e) {
        e.preventDefault();
        $("#video1").val("");
        $("#VideoPreview1").attr("src", "");
        $(".videopreview1").hide();
        $(".videopreview1").removeClass("it");
        $(".btn-rmv-video1").removeClass("rmv");
    });

    $("#removeVideo2").click(function (e) {
        e.preventDefault();
        $("#video2").val("");
        $("#VideoPreview2").attr("src", "");
        $(".videopreview2").hide();
        $(".videopreview2").removeClass("it");
        $(".btn-rmv2").removeClass("rmv");
    });

    $("#removeVideo3").click(function (e) {
        e.preventDefault();
        $("#video3").val("");
        $("#VideoPreview3").attr("src", "");
        $(".videopreview3").hide();
        $(".videopreview3").removeClass("it");
        $(".btn-rmv3").removeClass("rmv");
    });

    $("#removeVideo4").click(function (e) {
        e.preventDefault();
        $("#video4").val("");
        $("#VideoPreview4").attr("src", "");
        $(".videopreview4").hide();
        $(".videopreview4").removeClass("it");
        $(".btn-rmv4").removeClass("rmv");
    });

    $("#removeVideo5").click(function (e) {
        e.preventDefault();
        $("#video5").val("");
        $("#VideoPreview5").attr("src", "");
        $(".videopreview5").hide();
        $(".videopreview5").removeClass("it");
        $(".btn-rmv5").removeClass("rmv");
    });

    // moder / actor hide & show js start

    $(".first-choose #model").click(function () {
        $(".model-choose").show();
        $(".model-info").show();
        $(".acting-info").hide();
        $(".actor-choose").hide();
    });

    $(".first-choose #actor").click(function () {
        $(".actor-choose").show();
        $(".acting-info").show();
        $(".model-info").hide();
        $(".model-choose").hide();
    });

    
});
