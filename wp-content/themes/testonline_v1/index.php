<?php
/**
 * Wed Feb 08, 2012 21:04:55 added by Thanh Son 
 * Email: thanhson1085@gmail.com 
 */

get_header();
if ($_GET['post_type'] != 'trial_question'){
	?>
	<div class="d-page-container">
		<div class="d-page">	
			<div class="d-logo"></div>
				<?php
				global $post;
				$args = array( 'numberposts' => 1, 'post_type'=> 'session', 'post_status' => 'publish' );
				$myposts = get_posts( $args );
				foreach( $myposts as $post ) :	setup_postdata($post); ?>
					

					<div class="d-btn-test"> <img src="<?php echo get_bloginfo('template_url');?>/images/micky.gif" /><a href="<?php the_permalink(); ?>"/>Bài Thi</a></div>
				<?php endforeach; ?>	
					
		
			<div class="d-btn-demo"> <img src="<?php echo get_bloginfo('template_url');?>/images/micky.gif" /><a href="?post_type=trial_question"/>Phần Mềm<a></div>

			<div class="img3"><img src="<?php echo get_bloginfo('template_url');?>/images/img7.jpg" /></div>
			
			<div class="img2"><img src="<?php echo get_bloginfo('template_url');?>/images/img8.jpg" /></div>
			<div class="img1"><img src="<?php echo get_bloginfo('template_url');?>/images/img1.jpg" /></div>
			
		
			<div class="d-flower3"><img src="<?php echo get_bloginfo('template_url');?>/images/flower3.png" /></div>
		</div>
	</div>
	<?php
	get_footer();
	return;
}

?>
<div class="i-header">
	<div class="i-logo"><a href="<?php echo get_bloginfo('url');?>"><img src="<?php echo get_bloginfo("template_url");?>/images/logo5.png"></a></div>
	<div class="img4"><img src="<?php echo get_bloginfo('template_url');?>/images/img8.jpg" /></div>
	<div class="img5"><img src="<?php echo get_bloginfo('template_url');?>/images/img12.jpg" /></div>
	<div id="topbar">
		<?php if ( is_user_logged_in() ) { ?>
					
			<i>Xin chào <?php echo wp_get_current_user()->user_login; ?></i> | <a href="<?php echo get_admin_url(); ?>">Quản trị</a>
				| <a href="<?php echo wp_logout_url(); ?>">Đăng xuất</a>
					
			<?php } 
			else{
					?>
						<a href="<?php echo wp_login_url(); ?>">Đăng nhập</a> 
					<?php
					}
					?>
	</div>
</div>


<div class="i-content">
<div class="i-right-sidebar">
<ul class="btn-test-list">
<?php
global $post;
$args = array( 'numberposts' => 1, 'post_type'=> 'session', 'post_status' => 'publish' );
$myposts = get_posts( $args );
foreach( $myposts as $post ) :	setup_postdata($post); ?>
	<li><a href="<?php the_permalink(); ?>"><span>Làm bài thi</span></a></li>
	<?php 
	if (get_user_role()){
		?>
		<li><a href="?hidden_term=hidden-<?php echo $post->ID; ?>" target="_blank"><span>Kết quả thi</span></a></li>
		<?php
	}

	?>

<?php endforeach; ?>
</ul>
<!--p><a href="?hidden_term=<?php echo '#';?>">Sample Question</a></p-->
<h2 class="i-right-h2">Ôn tập</h2>
<form method="POST" action="index.php?post_type=trial_question">
<div class="i-term-container">
<h3 class="i-right-h3">Chọn lớp</h3>
<?php
$args = array( 'taxonomy' => 'class' );

$terms = get_terms('class', $args);

$count = count($terms);
$checked = (!get_query_var('class'))? 'checked="checked"': '';
if ($count > 0) {

    foreach ($terms as $term) {
		if (strtoupper(urlencode(get_query_var('class'))) != strtoupper($term->slug)){
			echo '<p><input type="radio" name="class" '.$checked.' value="'.$term->slug.'"/><label>' . $term->name . '</label></p>';
    	}
		else{
			echo '<p><input type="radio" name="class" checked="checked" value="'.$term->slug.'"/><label>' . $term->name . '</label></p>';
			$class_name = $term->name;
		}
		$checked='';
    }

}
?>
</div>

<div class="i-term-container">
<h3 class="i-right-h3">Chọn học kỳ</h3>
<?php
$args = array( 'taxonomy' => 'classterm' );

$terms = get_terms('classterm', $args);

$count = count($terms); 
$checked = (!get_query_var('classterm'))? 'checked="checked"': '';
if ($count > 0) {

    foreach ($terms as $term) {
		if (strtoupper(urlencode(get_query_var('classterm'))) != strtoupper($term->slug)){
			echo '<p><input type="radio" name="classterm" '.$checked.' value="'.$term->slug.'"/><label>' . $term->name . '</label></p>';
    	}
		else{
			echo '<p><input type="radio" name="classterm" checked="checked" value="'.$term->slug.'"/><label>' . $term->name . '</label></p>';
			$term_name = $term->name;
		}
		$checked='';	
    }

}

?>
</div>	
<div class="i-term-container">
<h3 class="i-right-h3">Chọn môn</h3>
<?php
$args = array( 'taxonomy' => 'subject' );

$terms = get_terms('subject', $args);

$count = count($terms); 
//echo esc_html(get_query_var('subject'));
$checked = (!get_query_var('subject'))? 'checked="checked"': '';
if ($count > 0) {

    foreach ($terms as $term) {
		//echo  urlencode(get_query_var('subject')).'<>'.strtoupper($term->slug);
		if (strtoupper(urlencode(get_query_var('subject'))) != strtoupper($term->slug)){
			echo '<p><input type="radio" name="subject" '.$checked.' value="'.$term->slug.'"/><label>' . $term->name . '</label></p>';
    	}
		else{
			echo '<p><input type="radio" name="subject" checked="checked" value="'.$term->slug.'"/><label>' . $term->name . '</label></p>';
			$subject_name = $term->name;
		}
		$checked='';	
    }
}
?>
</div>
<p class="i-right-btn"><input type="submit" value="Ôn tập"/></p>	
</form>
</div>
<div class="i-body-content">

<div class="tq-content-container">

<?php
/*if ( !get_query_var('class')){
	echo '<div class="i-welcome"></div>';
}*/
$args = array(
	'tax_query' => array(
		'relation' => 'AND',
		array(
			'taxonomy' => 'class',
			'field' => 'slug',
			'terms' => array( get_query_var('class') )
		),
		array(
			'taxonomy' => 'classterm',
			'field' => 'slug',
			'terms' => array( get_query_var('classterm') )
		),
		array(
			'taxonomy' => 'subject',
			'field' => 'slug',
			'terms' => array(get_query_var('subject'))
		)
	),
	'posts_per_page' => '-1',
	'post_type' => 'trial_question',
	'post_status' => 'publish',
	'order' => 'ASC',
);
$query = new WP_Query( $args );
if ($query->post-count){
?>
<div id="i-test-info">
<ul>
<li><span>
<?php echo 'Lớp: '.$class_name;?>
</span></li>
<li><span>
<?php echo 'Học kỳ: '.$term_name;?>
</span></li>
<li><span>
<?php echo 'Môn: '.$subject_name;?>
</span></li>
<li><span>
<?php echo 'Làm đúng: <span id="true-answers">0</span>/'.$query->post_count;?>
</span></li>
<li><span>
<?php echo 'Đang làm câu thứ: <span id="no-answers">1</span>';?>
</span></li>
</ul>
</div>
<div id="i-question-list"></div>
<div id="i-message"></div>

<?php
}
else{
	if ($_GET['post_type'] == 'trial_question' && get_query_var('class') && get_query_var('classterm') && get_query_var('subject')){
		?>
		<div id="i-message" style="display: block;">Không có bài tập trong mục bạn đang tìm kiếm</div>
		<?php
	}
	
		?>	
		<div class="i-intro-container">
			<div class="i-intro">
				<h1>Giới thiệu</h1>
				<p>Phần mềm thi và ôn tập trực tuyến của trường tiểu học Thịnh Liệt</p>
				<p><img src="<?php echo get_bloginfo('template_url');?>/images/subbn.gif"/></p>
				<h2>Chức năng phần mềm</h2>
				<h3>Dành cho giáo viên</h3>
					<ul>
						<li>Quản lý đề thi</li>
						<li>Quản lý câu hỏi thi</li>
						<li>Quản lý câu hỏi ôn tập</li>
						<li>Quản lý môn học</li>
						<li>Quản lý học kỳ</li>
						<li>Quản lý lớp học</li>
						<li>Quản lý điểm tối đa của đề thi</li>
						<li>Quản lý điểm tối đa của câu hỏi</li>
						<li>Quản lý điểm của học sinh</li>
					</ul>
				<h3>Dành cho học sinh</h3>
					<ul>
						<li>Làm bài thi</li>
						<li>Ôn tập</li>
					</ul>
				<h2> Công nghệ sử dụng trong phần mềm </h2>
					<ul>
						<li>Mã nguồn mở wordpress</li>
						<li>HTML, CSS3, jQuery</li>
					</ul>
			</div>
		</div>
		<?php
	
}
$j=0;
while ( $query->have_posts() ) : $query->the_post(); ?>


		<?php 

		$answers = array();
		$answers_true = array();
		$j++;
		?>
		<div class="q-content-container notyet" id="q-item-<?php echo $j;?>">
		<p class="q-title"><?php echo $post->post_title; ?></p>
		<div class="q-desc"><?php the_content();//echo $post->post_content; ?></div>
		<?php
		$answers = get_post_metadata($post->ID,array('False','True'));

		$answers_true = get_post_metadata($post->ID,array('True'));
		$answers = array_merge($answers,get_post_metadata($post->ID,array('Text'),false));
		$types = wp_get_post_terms($post->ID,'type',array('fields' => 'names'));
			
		switch ($types[0]) {
			case 'Multiple':
				$input_type = 'checkbox';
				break;
			case 'Single':
				$input_type = 'radio';
				break;
			case 'Text':
				$input_type = 'text';
				break;
			default:
				$input_type = 'checkbox';
		}
		$i = 1000;
		?>
		<?php
					?>
			<div class="q-answer-container">
			<?php
		foreach ($answers as $answer){

			if ($input_type == 'checkbox') ++$i;
			if ($answer->meta_key != 'Text'){
				?>
				<p class="<?php echo $answer->meta_key;?>"><input type="<?php echo $input_type;?>" name="ans_check_<?php echo $i;?>_<?php echo $post->ID;?>" value="<?php echo $answer->meta_id;?>"/><label><?php echo $answer->meta_value;?></label></p>
				<?php
			}
			else{
				if ($input_type == 'text'){
					?>
					<p class="<?php echo $answer->meta_value;?>"><input type="text" name="ans_text_<?php echo rand(1000,9999);?>_<?php echo $post->ID;?>"/></p>
					<?php
				}
			}

		}
					?>
				
			<?php
		?>
		</div>
		<p class="next-page-container">
		<?php
			if (is_user_logged_in()):
			?>
			<span class="btn-edit"><a target="_blank" href="<?php echo get_bloginfo('url');?>/wp-admin/post.php?post=<?php echo $post->ID;?>&action=edit">Sửa nội dung</a></span>
			<?php
			endif;
			?>
		<span class="btn-bypass">Bỏ qua</span><span class="btn-next">Tiếp theo</span></p>
	
		
	</div>
			<?php
	
					endwhile;
					
					?>
			<div id="i-passed-list"></div>		
		</div>
	<div class="wg-container"><!-- start widget -->
<?php
	$args = array('taxonomy'=>'class');
	$classes = get_terms('class',$args);
	$args = array('taxonomy'=>'classterm');
	$classterms = get_terms('classterm',$args);
	$args = array('taxonomy'=>'subject');
	$subjects = get_terms('subject',$args);
	?>
	<div id="wg-classes-list">
	<ul>
	<?php
	foreach ($classes as $class){
		echo '<li>Lớp '.$class->name;
		?>
		<div class="wg-classterms-list">
		<ul>
		<?php
		foreach ($classterms as $classterm){
			echo '<li>Học kỳ '.$classterm->name;
			?>
				<div class="wg-subject-list">
				<ul>
				<?php
				foreach ($subjects as $subject){
					echo '<li><a href="?post_type=trial_question&class='.$class->slug.'&classterm='.$classterm->slug.'&subject='.$subject->slug.'">'.$subject->name;
					echo '</a></li>';
				}
				?>
				</ul>
				</div>

			<?php

			echo '</li>'; 
		}
		?>
		</ul>
		</div>

		<?php
		echo '</li>';	
	}
	?>
	</ul>
	</div>
<?php
?>
</div><!-- end widget -->	

</div>

</div>
<?php

get_footer();
